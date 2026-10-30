"""Build the illustrated PDF, offline reader, source and research deliverables."""
from pathlib import Path
import re, json, html, csv, zipfile, shutil, math, os
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer,
    PageBreak, Table, TableStyle, KeepTogether, Preformatted, Flowable, CondPageBreak)
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.graphics import renderPDF, renderSVG
from pypdf import PdfReader

ROOT=Path(__file__).resolve().parent
OUT=ROOT.parent/'outputs'; OUT.mkdir(exist_ok=True)
PAGE_W,PAGE_H=540,702
MARGIN=58
TEXT_W=PAGE_W-2*MARGIN
TEXT_H=PAGE_H-125
FONTDIR=Path(os.environ.get('BOOK_FONT_DIR','C:/Windows/Fonts'))

def register_fonts():
    candidates={
      'Serif':'georgia.ttf','SerifB':'georgiab.ttf','SerifI':'georgiai.ttf','SerifBI':'georgiaz.ttf',
      'Sans':'calibri.ttf','SansB':'calibrib.ttf','SansI':'calibrii.ttf','Mono':'consola.ttf'}
    for name,filename in candidates.items():pdfmetrics.registerFont(TTFont(name,str(FONTDIR/filename)))
    pdfmetrics.registerFontFamily('Serif',normal='Serif',bold='SerifB',italic='SerifI',boldItalic='SerifBI')
    pdfmetrics.registerFontFamily('Sans',normal='Sans',bold='SansB',italic='SansI',boldItalic='SansB')

register_fonts()
from figures import get_figure, REGISTRY, ALIASES, NAVY, INK, TEAL, COPPER, GRAY, LIGHT, PALE

STYLES={
 'Body':ParagraphStyle('Body',fontName='Serif',fontSize=11.1,leading=15.6,textColor=INK,spaceAfter=7.3,allowWidows=0,allowOrphans=0),
 'H1':ParagraphStyle('H1',fontName='SansB',fontSize=25,leading=28.5,textColor=NAVY,spaceAfter=17,keepWithNext=True),
 'H2':ParagraphStyle('H2',fontName='SansB',fontSize=14.2,leading=17.3,textColor=TEAL,spaceBefore=15,spaceAfter=7,keepWithNext=True),
 'H3':ParagraphStyle('H3',fontName='SansB',fontSize=11.9,leading=15.4,textColor=COPPER,spaceBefore=12,spaceAfter=7,keepWithNext=True),
 'Kicker':ParagraphStyle('Kicker',fontName='SansB',fontSize=9,leading=12,textColor=COPPER,spaceAfter=12,tracking=1,keepWithNext=True),
 'Caption':ParagraphStyle('Caption',fontName='Sans',fontSize=9.2,leading=12.1,textColor=GRAY,spaceAfter=13),
 'FigureTitle':ParagraphStyle('FigureTitle',fontName='SansB',fontSize=11.1,leading=13.5,textColor=TEAL,spaceBefore=5,spaceAfter=7,keepWithNext=True),
 'Table':ParagraphStyle('Table',fontName='Sans',fontSize=9.2,leading=12.2,textColor=INK),
 'TableHead':ParagraphStyle('TableHead',fontName='SansB',fontSize=9.2,leading=12.2,textColor=colors.white),
 'Ref':ParagraphStyle('Ref',fontName='Sans',fontSize=9.3,leading=12.6,textColor=INK,spaceAfter=8),
 'Small':ParagraphStyle('Small',fontName='Sans',fontSize=9.8,leading=13.6,textColor=GRAY,spaceAfter=9),
 'Code':ParagraphStyle('Code',fontName='Mono',fontSize=8.7,leading=12,textColor=NAVY,backColor=PALE,borderPadding=9,spaceAfter=12),
 'TOC':ParagraphStyle('TOC',fontName='Sans',fontSize=10.5,leading=14.2,textColor=INK,spaceBefore=4.5,leftIndent=0,firstLineIndent=0,rightIndent=24),
}

PARTS={1:('I / THE IDEA BECOMES INDUSTRY','The loop, its history, and the meaning of accepted hardware'),4:('II / THE PHYSICAL GRAMMAR','Mechanisms, measurement, materials and processes'),8:('III / MACHINES IN A WORKING SYSTEM','Robots, feedback and repair'),11:('IV / INDUSTRIAL POWER','Energy, flow, evidence and shipyards'),15:('V / REMOTE INDUSTRY','The ocean, orbit, the Moon and Mars'),22:('VI / YOUR AEROSPACE PATH','Mathematics, education, projects and roles'),26:('VII / CHOOSING DEPTH','Graduate questions, methods and meaningful contribution')}
CHAPTER_PART={}
for n in range(1,29):CHAPTER_PART[n]=max(k for k in PARTS if k<=n)

def norm(s):
    s=s.replace('\ufeff','').replace('\u2011','-').replace('\u2013','-').replace('\u2014',' - ').replace('\u2212','-').replace('\u00a0',' ')
    # Repair missing spaces in original prose, leaving citation IDs and URLs intact.
    if '://' not in s:
        s=re.sub(r'\b([A-Za-z]{2,})(\d)',r'\1 \2',s)
        s=re.sub(r'(\d)([A-Za-z]{3,})\b',r'\1 \2',s)
        s=re.sub(r'(\d),(\d{4})\b',r'\1, \2',s)
    return s

def inline(s):
    s=norm(s); s=html.escape(s)
    s=re.sub(r'\[([^\]]+)\]\((https?://[^\s)]+)\)',lambda m:f'<link href="{m[2]}" color="#137E82">{m[1]}</link>',s)
    s=re.sub(r'\*\*(.+?)\*\*',r'<b>\1</b>',s)
    s=re.sub(r'(?<!\*)\*([^*]+)\*(?!\*)',r'<i>\1</i>',s)
    s=re.sub(r'`([^`]+)`',r'<font name="Mono" size="9.6">\1</font>',s)
    s=re.sub(r'\[([FSCI]\d{2})\]',lambda m:f'<link href="#ref-{m[1]}" color="#137E82"><font name="Sans" size="9">[{m[1]}]</font></link>',s)
    s=re.sub(r'\b(Chapter (\d{1,2}))\b',lambda m:f'<link href="#ch-{int(m[2]):02d}" color="#137E82">{m[1]}</link>',s)
    return s

def P(s,style='Body'):return Paragraph(inline(s),STYLES[style])

class Cover(Flowable):
    def __init__(self):Flowable.__init__(self);self.width=TEXT_W;self.height=TEXT_H-1
    def draw(self):
        c=self.canv;c.saveState();c.translate(-MARGIN,-64)
        c.setFillColor(NAVY);c.rect(0,0,PAGE_W,PAGE_H,stroke=0,fill=1)
        c.setStrokeColor(colors.HexColor('#24475A'));c.setLineWidth(.4)
        for x in range(0,541,30):c.line(x,0,x,702)
        for y in range(0,703,30):c.line(0,y,540,y)
        c.setFillColor(COPPER);c.rect(54,633,58,4,stroke=0,fill=1)
        c.setFont('SansB',10);c.setFillColor(colors.HexColor('#B9D3D9'));c.drawString(54,610,'AN ILLUSTRATED ENGINEERING FIELD GUIDE')
        c.setFillColor(colors.white);c.setFont('SansB',39)
        for i,s in enumerate(['THE FACTORY','THAT BUILDS','THE FUTURE']):c.drawString(51,545-i*45,s)
        c.setFont('Sans',16);c.setFillColor(colors.HexColor('#CFDCE0'))
        c.drawString(54,369,'Robotic shipyards. Industrial power.')
        c.drawString(54,347,"The aerospace engineer's path beyond Earth.")
        # Exploded interface turns into a truss: all original vector artwork.
        for i in range(3):
            y=89+i*52;x=70+i*18
            p=c.beginPath();p.moveTo(x,y);p.lineTo(x+172,y);p.lineTo(x+221,y+44);p.lineTo(x+49,y+44);p.close()
            c.setStrokeColor(COPPER if i==2 else colors.HexColor('#7AAEB9'));c.setLineWidth(1.3);c.drawPath(p,stroke=1,fill=0)
            for dx in (49,172):c.ellipse(x+dx-5,y+18,x+dx+5,y+24,stroke=1,fill=0)
        c.setDash(3,4);c.setStrokeColor(colors.HexColor('#5E8997'))
        for x in (119,242):c.line(x,110,x+36,214)
        c.setDash();c.setLineWidth(1.2);c.setStrokeColor(colors.HexColor('#7AAEB9'))
        for i in range(5):
            x=300+i*30;y=114+i*19;c.line(x,y,x+30,y+19);c.line(x,y+39,x+30,y+58);c.line(x,y,x,y+39);c.line(x,y,x+30,y+58)
        c.setFillColor(COPPER);c.circle(318,227,5,fill=1,stroke=0);c.circle(365,272,5,fill=1,stroke=0)
        c.setStrokeColor(COPPER);c.setLineWidth(3);c.line(290,177,318,227);c.line(318,227,365,272);c.line(365,272,412,250)
        c.setFont('Sans',9);c.setFillColor(colors.HexColor('#B9D3D9'));c.drawString(54,39,'FIRST EDITION  /  RESEARCH BASELINE: 29 OCTOBER 2026')
        c.restoreState()

class BookDoc(BaseDocTemplate):
    def __init__(self,path):
        super().__init__(str(path),pagesize=(PAGE_W,PAGE_H),leftMargin=MARGIN,rightMargin=MARGIN,topMargin=59,bottomMargin=66,
                         title='The Factory That Builds the Future',author='The Factory — Public learning edition',subject='Robotic shipyards, industrial systems and an aerospace engineering path',pageCompression=1)
        frame=Frame(MARGIN,66,TEXT_W,TEXT_H,id='normal',leftPadding=0,rightPadding=0,topPadding=0,bottomPadding=0)
        self.addPageTemplates(PageTemplate(id='book',frames=frame,onPage=self.decorate,onPageEnd=self.running_header))
        self.current_title='THE FACTORY THAT BUILDS THE FUTURE';self.map={};self.figures=[]
    def beforeDocument(self):
        self.current_title='THE FACTORY THAT BUILDS THE FUTURE';self.map={};self.figures=[]
    def decorate(self,c,doc):
        if doc.page==1:return
        c.saveState();c.setFillColor(PALE);c.rect(0,0,PAGE_W,PAGE_H,fill=1,stroke=0)
        c.setStrokeColor(LIGHT);c.setLineWidth(.7);c.line(MARGIN,654,PAGE_W-MARGIN,654)
        c.setFont('Sans',8);c.setFillColor(GRAY)
        c.setFont('Sans',8.5);c.drawString(MARGIN,36,'THE FACTORY THAT BUILDS THE FUTURE')
        c.setFont('SansB',10);c.setFillColor(TEAL);c.drawRightString(PAGE_W-MARGIN,35,str(doc.page))
        c.restoreState()
    def running_header(self,c,doc):
        if doc.page==1:return
        c.saveState();title=self.current_title.upper()
        while pdfmetrics.stringWidth(title,'Sans',8)>TEXT_W:title=title[:-2]
        c.setFont('Sans',8);c.setFillColor(GRAY);c.drawString(MARGIN,664,title);c.restoreState()
    def afterFlowable(self,f):
        if getattr(f,'anchor',None):
            self.canv.bookmarkPage(f.anchor);self.map[f.anchor]=self.page
            self.current_title=f.getPlainText()
            if getattr(f,'toc',False):
                title=f.getPlainText();self.notify('TOCEntry',(0,title,self.page,f.anchor))
                self.canv.addOutlineEntry(title,f.anchor,0,False);self.current_title=title
        if getattr(f,'figkey',None):self.figures.append({'key':f.figkey,'page':self.page,'title':f.getPlainText()})

def heading(s,anchor):
    p=P(s,'H1');p.anchor=anchor;p.toc=True
    if anchor=='contents':
        p.style=ParagraphStyle('TOCHeading',parent=STYLES['H1'],keepWithNext=False);p.toc=False
    return p

def figure_flow(key,number):
    title,d,caption=get_figure(key)
    titlep=P(f'{number:02d} / {title}','FigureTitle');titlep.figkey=key
    seq=[titlep,d,Spacer(1,6),P(caption,'Caption')]
    if key.startswith('small_parts_'):
        return [PageBreak(),*seq,PageBreak()]
    return [KeepTogether(seq)]

EXTRA_FIGS={2:['history'],7:['manufacturing_choice'],9:['control_loop'],17:['orbital_economics'],21:['future_horizons'],23:['subject_hardware'],26:['research_cycle']}

def parse_chapter(path,figure_counter):
    raw=path.read_text(encoding='utf-8-sig').strip();lines=raw.splitlines();out=[]
    n=int(path.name[:2]);title=lines[0].lstrip('# ').strip()
    body_style=STYLES['Body']
    if n in {1,7,10,11,14,15,19,23,24,29}:
        STYLES['Body']=ParagraphStyle(f'Body-{n}',parent=body_style,leading=15.2,spaceAfter=6.8)
    if n in {10,11,19,24,29}:
        STYLES['Body']=ParagraphStyle(f'Body-{n}',parent=body_style,leading=14.9,spaceAfter=6.4)
    out.append(PageBreak())
    if n in PARTS:
        a,b=PARTS[n];out.extend([P(a,'Kicker'),P(b,'Small'),Spacer(1,9)])
    elif 1<=n<=28:out.append(P(f'{PARTS[CHAPTER_PART[n]][0]}  /  CHAPTER {n:02d}','Kicker'))
    else:out.append(P('READER\'S FIELD GUIDE' if n>=30 else 'THE FACTORY THAT BUILDS THE FUTURE','Kicker'))
    out.append(heading(title,f'ch-{n:02d}'))
    paragraphs=[];i=1;h2_count=0;addedextras=False
    def flush():
        if paragraphs:
            s=' '.join(paragraphs).strip();paragraphs.clear()
            if s:out.append(P(s))
    def addfig(key):
        nonlocal figure_counter
        figure_counter+=1;out.extend(figure_flow(key,figure_counter))
    while i<len(lines):
        line=lines[i].strip()
        if not line:flush();i+=1;continue
        if line.startswith('[[FIG:'):
            flush();key=line[6:-2];addfig(key)
            if key=='small_parts_1':addfig('small_parts_2')
            i+=1;continue
        if line.startswith('##'):
            flush()
            if line.startswith('###'):out.append(P(line.lstrip('# '),'H3'))
            else:
                h2_count+=1
                if h2_count==2 and n in EXTRA_FIGS:
                    for key in EXTRA_FIGS[n]:addfig(key)
                    addedextras=True
                out.append(P(line.lstrip('# '),'H2'))
            i+=1;continue
        if line.startswith('```'):
            flush();code=[];i+=1
            while i<len(lines) and not lines[i].startswith('```'):code.append(norm(lines[i]));i+=1
            from textwrap import wrap as twrap
            wrapped=[]
            for l in code:wrapped.extend(twrap(l,76,replace_whitespace=False,drop_whitespace=False) or [''])
            out.append(Preformatted('\n'.join(wrapped),STYLES['Code']));i+=1;continue
        if line.startswith('|'):
            flush();rows=[]
            while i<len(lines) and lines[i].strip().startswith('|'):
                cells=[v.strip() for v in lines[i].strip().strip('|').split('|')]
                if not all(re.fullmatch(r'[:\- ]+',v) for v in cells):rows.append(cells)
                i+=1
            count=max(map(len,rows));rows=[r+['']*(count-len(r)) for r in rows]
            data=[[P(c,'TableHead' if j==0 else 'Table') for c in row] for j,row in enumerate(rows)]
            t=Table(data,colWidths=[TEXT_W/count]*count,repeatRows=1,hAlign='LEFT')
            t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),NAVY),('ROWBACKGROUNDS',(0,1),(-1,-1),[colors.white,LIGHT]),('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),8),('RIGHTPADDING',(0,0),(-1,-1),8),('TOPPADDING',(0,0),(-1,-1),7),('BOTTOMPADDING',(0,0),(-1,-1),7),('LINEBELOW',(0,0),(-1,0),1,TEAL)]))
            out.extend([t,Spacer(1,13)]);continue
        if re.match(r'^[-*] ',line):flush();out.append(P('- '+line[2:]));i+=1;continue
        if line.startswith('> '):flush();out.append(P(line[2:],'Small'));i+=1;continue
        if line=='---':flush();out.append(Spacer(1,8));i+=1;continue
        paragraphs.append(line);i+=1
    flush()
    if n in EXTRA_FIGS and not addedextras:
        for key in EXTRA_FIGS[n]:addfig(key)
    STYLES['Body']=body_style
    return out,figure_counter,raw

def read_sources():
    sources=[]
    for p in sorted((ROOT/'research').glob('*.json')):
        data=json.loads(p.read_text(encoding='utf-8-sig'))
        if isinstance(data,dict):data=data.get('sources',data.get('entries',[]))
        sources.extend(data)
    # IDs remain stable even where two chapters consult the same source.
    return sorted(sources,key=lambda r:r['id'])

def source_text(r):
    return f"[{r['id']}] {r.get('title','')} - {r.get('organization',r.get('author',''))}. {r.get('date','Undated')}. {r.get('url','')}"

def opening():
    story=[Cover(),PageBreak(),P('PUBLIC LEARNING EDITION','Kicker'),P('The Factory That Builds the Future','H1'),
           P("Robotic shipyards, industrial power, and the aerospace engineer's path beyond Earth.",'H2'),
           P('Public learning edition. Research baseline: 29 October 2026.','Small'),Spacer(1,12),
           P('This book combines researched primary-source claims with original explanations, fictional engineering scenarios and reproducible teaching calculations. It connects industrial systems to an accessible path through aerospace and mechanical engineering.'),
           P('MERIDIAN, MERIDIAN-O and MERIDIAN-L are fictional design studies. All illustrations are original vector schematics. They are not photographs of real equipment, released designs, or evidence of flight qualification.'),
           P('Reading numbers: bracketed source IDs link to the research guide. Chapter references link within the PDF. Numerical examples state illustrative assumptions; the growth model uses abstract periods and normalized capacity units.'),
           P('Institutional scope: current program descriptions were checked where accessible. No individual college-to-university course articulation is established by this book. Enrollment, admission, transfer and graduation dates remain conditional.'),
           P('Production: authored and typeset with Codex using ReportLab. This public edition includes the complete narrative, original diagrams, worked examples and research guide. Teaching scenarios are illustrative and do not qualify equipment for service.','Small'),
           PageBreak(),heading('A map of the journey','reader-map')]
    for a,b,c in [('01-03','THE IDEA','Industrial feedback, history, requirements and accepted hardware.'),('04-07','THE PHYSICAL GRAMMAR','Mechanisms, measurement, materials and manufacturing decisions.'),('08-10','THE WORKING MACHINE','Robot form, feedback, coordination, maintenance and repair.'),('11-14','THE INDUSTRIAL SYSTEM','Power, heat, flow, evidence and terrestrial shipyards.'),('15-21','BEYOND EASY REACH','Ocean residency, orbital assembly, lunar industry, Mars and closure.'),('22-25','YOUR ROUTE INTO THE WORK','Mathematics, aerospace education, projects and engineering roles.'),('26-28','PURPOSEFUL DEPTH','Graduate questions, research methods and choosing a direction.')]:
        story.append(P(f'{a} / {b}','H3'));story.append(P(c,'Small'))
    story.extend([Spacer(1,8),P('Read the narrative in order, or use the topic finder to follow a question. Keep returning to three tests: What must be true? What evidence exists? What support remains outside the boundary?'),PageBreak(),P('CONTENTS','Kicker'),heading('Inside the factory','contents')])
    toc=TableOfContents();toc.levelStyles=[STYLES['TOC']];toc.dotsMinLevel=0;story.append(toc)
    return story

TOPICS={
 'AI-assisted design and evidence':[3,13], 'Alignment, datums and tolerances':[4,5], 'Aerospace versus mechanical engineering':[23,25],
 'Assembly and manufacturing, distinguished':[1,7,16], 'Autonomy and intervention':[8,9,13,20], 'Backlash and compliance':[4,9],
 'Bearings, seals and small dependencies':[4,6,10,19], 'Bottlenecks, yield and work in progress':[12], 'Calibration and uncertainty':[5,13],
 'Careers and the2030s':[25,28], 'College algebra and the mathematics chain':[22,23], 'Coordinate frames and momentum':[9,16,26],
 'Data centers, power and heat':[11,13], 'Digital twins and SHIPYARD ONE':[12,13,24], 'Graduate degrees and research':[26,27,28],
 'History of industrial capability':[2], 'Industrial closure and self-replication':[1,6,18,21], 'Inspection and qualification':[3,5,7,27],
 'Lunar deployment and repair':[18,19], 'Make, stock, repair or import':[7,17,19], 'Mars and communication delay':[20],
 'Materials and semiconductor dependencies':[6,7,18], 'Mechanisms and service interfaces':[4,10,16,19], 'Ocean residency':[15],
 'Orbital economics and assembly':[16,17], 'Power, storage and radiator sizing':[11], 'Projects and portfolio evidence':[24],
 'Repair, redundancy and return to service':[10,19], 'Robot forms and task design':[8], 'Shipyards and welding distortion':[14],
 'Transfer requirements and uncertainty':[23], 'Working on space versus in space':[25,28]
}

def appendices(story,sources):
    story.extend([PageBreak(),P('RESEARCH GUIDE','Kicker'),heading('Sources, boundaries and further reading','sources'),P('Source IDs remain stable throughout the book. Repeated URLs reflect their use in different chapters; they are not counted as distinct primary sources. The compact research file preserves retrieval status and claim limits. Company announcements establish reported milestones or intent, not independent proof of general performance.'),P('Access baseline: 29 October 2026. The Altman publisher transcript and SpaceX Mars body were inspected through Chrome after ordinary extraction failed. Some catalog, articulation and technical-report material remained partial or inaccessible. Those limits are recorded below.','Small')])
    for r in sources:
        p=Paragraph(f'<a name="ref-{r["id"]}"/><b>[{r["id"]}] {html.escape(norm(r.get("title","")))}</b><br/>{html.escape(norm(r.get("organization",r.get("author",""))))}. {html.escape(str(r.get("date","Undated")))}.<br/><link href="{html.escape(r.get("url",""),quote=True)}" color="#137E82">Open source</link> | {html.escape(r.get("status","status not recorded"))}<br/>{html.escape(norm(r.get("supports",r.get("claim",""))))}<br/><font color="#667780">Limit: {html.escape(norm(r.get("limitation",r.get("limitations","No additional limitation recorded."))))}</font>',STYLES['Ref'])
        story.append(p)
    story.extend([PageBreak(),P('TOPIC FINDER','Kicker'),heading('Follow a question','topic-finder')])
    for term,chapters in TOPICS.items():story.append(P(f'**{term}.** '+', '.join(f'Chapter {n}' for n in chapters),'Ref'))
    story.extend([Spacer(1,16),P('Keep exploring','H2'),P('The public learning world connects this book to worked lessons, practice questions, interactive models and project blueprints. Use the research guide to examine original sources, and keep a record of the assumptions and evidence behind your own work.','Small')])

def html_reader(raws,sources):
    # Use the same normalized text and original SVGs; no network resources.
    svgdir=ROOT/'figures';svgdir.mkdir(exist_ok=True)
    svg_cache={}
    for key in REGISTRY:
        title,d,caption=get_figure(key)
        fp=svgdir/(key+'.svg');renderSVG.drawToFile(d,str(fp))
        svg=fp.read_text(encoding='utf-8');svg=svg[svg.find('<svg'):]
        svg=svg.replace('<title>...</title>','<title>'+html.escape(title)+'</title>').replace('<desc>...</desc>','<desc>'+html.escape(caption)+'</desc>')
        svg=svg.replace('id="clip"',f'id="clip-{key}"').replace('url(#clip)',f'url(#clip-{key})').replace('id="group"',f'id="group-{key}"')
        fp.write_text(svg,encoding='utf-8')
        svg_cache[key]=svg
    def hi(s):
        v=html.escape(norm(s));v=re.sub(r'\*\*(.+?)\*\*',r'<strong>\1</strong>',v);v=re.sub(r'`([^`]+)`',r'<code>\1</code>',v)
        v=re.sub(r'\[([FSCI]\d{2})\]',r'<a href="#ref-\1">[\1]</a>',v)
        v=re.sub(r'\bChapter (\d{1,2})\b',lambda m:f'<a href="#ch-{int(m[1]):02d}">Chapter {m[1]}</a>',v)
        v=re.sub(r'\[([^\]]+)\]\((https?://[^)]+)\)',r'<a href="\2">\1</a>',v)
        return v
    nav=[];sections=[]
    for n,raw in raws:
        lines=raw.splitlines();title=lines[0].lstrip('# ');nav.append(f'<a href="#ch-{n:02d}">{html.escape(title)}</a>')
        bits=[f'<section id="ch-{n:02d}"><h1>{hi(title)}</h1>'];buf=[];table_rows=[];h2_count=0;in_code=False;code_lines=[]
        def flush():
            if buf:bits.append('<p>'+hi(' '.join(buf))+'</p>');buf.clear()
        def tableflush():
            if not table_rows:return
            chunks=['<table>']
            for j,row in enumerate(table_rows):
                tag='th' if j==0 else 'td';chunks.append('<tr>'+''.join(f'<{tag}>{hi(c)}</{tag}>' for c in row)+'</tr>')
            chunks.append('</table>');bits.append(''.join(chunks));table_rows.clear()
        def addfigure(key):
            key=ALIASES.get(key,key);title,d,cap=get_figure(key)
            bits.append(f'<figure>{svg_cache[key]}<figcaption><strong>{hi(title)}</strong> {hi(cap)}</figcaption></figure>')
        for l in lines[1:]:
            l=l.strip()
            if l.startswith('```'):
                flush();tableflush()
                if in_code:bits.append('<pre><code>'+html.escape('\n'.join(code_lines))+'</code></pre>');code_lines=[]
                in_code=not in_code
                continue
            if in_code:code_lines.append(l);continue
            if not l:flush();tableflush();continue
            if not l.startswith('|'):tableflush()
            if l.startswith('[[FIG:'):
                flush();key=l[6:-2];addfigure(key)
                if key=='small_parts_1':addfigure('small_parts_2')
                continue
            if l.startswith('##'):
                flush();level=3 if l.startswith('###') else 2
                if level==2:
                    h2_count+=1
                    if h2_count==2 and n in EXTRA_FIGS:
                        for key in EXTRA_FIGS[n]:addfigure(key)
                bits.append(f'<h{level}>{hi(l.lstrip("# "))}</h{level}>');continue
            if l.startswith('|'):
                flush();cells=[v.strip() for v in l.strip('|').split('|')]
                if not all(re.fullmatch(r'[:\- ]+',v) for v in cells):table_rows.append(cells)
                continue
            buf.append(l)
        flush();tableflush();bits.append('</section>');sections.append(''.join(bits))
    refs='<section id="references"><h1>Research guide</h1>'+''.join(f'<p id="ref-{r["id"]}"><strong>[{r["id"]}] {hi(r.get("title",""))}</strong><br>{hi(r.get("organization",r.get("author","")))}. {hi(str(r.get("date","")))}. <a href="{html.escape(r.get("url",""))}">Open source</a><br>{hi(r.get("supports",""))}<br><small>{hi(r.get("limitation",r.get("limitations","")))}</small></p>' for r in sources)+'</section>'
    document='''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>The Factory That Builds the Future</title><style>
    :root{--navy:#102d40;--teal:#137e82;--copper:#ba6c45;--paper:#f6f4ee}*{box-sizing:border-box}body{margin:0;background:var(--paper);color:#243844;font-family:Georgia,serif;line-height:1.75}aside{position:fixed;width:290px;inset:0 auto 0 0;overflow:auto;background:var(--navy);padding:26px;color:#e1ecee;font-family:Calibri,Arial,sans-serif}aside h2{font-size:23px;line-height:1.2;color:white}aside a{display:block;padding:7px 0;color:#c9dde0;text-decoration:none;font-size:14px;line-height:1.4}aside a:hover{color:white}aside small{color:#88b8c0}main{margin-left:290px;max-width:1050px;padding:60px 64px}header{padding:35px 0 55px;border-bottom:4px solid var(--copper)}header h1{font-family:Calibri,Arial,sans-serif;font-size:54px;line-height:1.05;color:var(--navy)}header p{font-size:21px}section{padding:45px 0;border-bottom:1px solid #ccd8da;scroll-margin-top:20px}h1,h2,h3{font-family:Calibri,Arial,sans-serif;line-height:1.25}h1{font-size:34px;color:var(--navy)}h2{margin-top:36px;color:var(--teal);font-size:25px}h3{color:var(--copper);font-size:21px}p{font-size:18px}a{color:var(--teal)}figure{margin:30px 0}svg{width:100%;height:auto}figcaption{font-family:Calibri,Arial,sans-serif;line-height:1.5;font-size:15px;color:#667780}table{width:100%;border-collapse:collapse;margin:22px 0;font:16px/1.5 Calibri,Arial,sans-serif}th,td{text-align:left;vertical-align:top;padding:12px;border-bottom:1px solid #ccd8da}th{background:var(--navy);color:white}tr:nth-child(even){background:#e9efed}pre{overflow:auto;padding:20px;background:#e9efed;line-height:1.55}code{font:14px/1.5 Consolas,monospace}@font-face{font-family:Sans;src:local('Calibri')}@font-face{font-family:SansB;src:local('Calibri Bold')}@font-face{font-family:Serif;src:local('Georgia')}.hint{font:15px/1.5 Calibri,Arial,sans-serif;color:#667780}button{border:0;border-radius:3px;padding:9px 12px;background:#137e82;color:white;cursor:pointer}.top{position:fixed;right:20px;bottom:18px}small{font-family:Calibri,Arial,sans-serif}@media(max-width:850px){aside{position:static;width:auto;max-height:290px}main{margin:0;padding:28px}header h1{font-size:40px}p{font-size:17px}}@media print{aside,.top{display:none}main{margin:0;padding:0}section{break-before:page}}
    </style><aside><small>PUBLIC LEARNING EDITION / 29 OCT 2026</small><h2>The Factory That Builds the Future</h2><p style="font:14px/1.5 Calibri,Arial">Use Ctrl+F to search the complete book. Every chapter and source is linked.</p>'''+''.join(nav)+'''<a href="#references">Research guide</a></aside><main><header><div class="hint">ROBOTIC SHIPYARDS / INDUSTRIAL POWER / AEROSPACE</div><h1>The Factory That<br>Builds the Future</h1><p>From a serviceable mechanism to a civilization that can build beyond Earth.</p><div class="hint">An offline reading companion for curious builders. Fictional scenarios and illustrative calculations are labeled. No external scripts, fonts or analytics.</div></header>'''+''.join(sections)+refs+'''</main><button class="top" onclick="window.scrollTo({top:0,behavior:'smooth'})">Back to top</button></html>'''
    (OUT/'Factory_That_Builds_the_Future_Reader.html').write_text(document,encoding='utf-8')

def main():
    files=sorted((ROOT/'chapters').glob('*.md'));sources=read_sources()
    ids={s['id'] for s in sources};allraw='\n\n'.join(p.read_text(encoding='utf-8-sig') for p in files)
    used=set(re.findall(r'\[([FSCI]\d{2})\]',allraw));missing=used-ids
    if missing:raise ValueError(f'Missing bibliography entries: {missing}')
    markers=re.findall(r'\[\[FIG:([^\]]+)\]\]',allraw)
    unknown=[k for k in markers if ALIASES.get(k,k) not in REGISTRY]
    if unknown:raise ValueError(f'Unknown figure keys: {unknown}')
    story=opening();counter=0;raws=[]
    for p in files:
        flows,counter,raw=parse_chapter(p,counter);story.extend(flows);raws.append((int(p.name[:2]),raw))
    appendices(story,sources)
    story=[f for i,f in enumerate(story) if not (isinstance(f,PageBreak) and i and isinstance(story[i-1],PageBreak))]
    path=OUT/'The_Factory_That_Builds_the_Future.pdf';doc=BookDoc(path);doc.multiBuild(story,maxPasses=5)
    (ROOT/'page_map.json').write_text(json.dumps(doc.map,indent=2))
    (ROOT/'figure_map.json').write_text(json.dumps(doc.figures,indent=2))
    reader=PdfReader(path)
    words=len(re.findall(r"\b\w+(?:[-']\w+)*\b",norm(allraw)))
    stats={'pages':len(reader.pages),'manuscript_words_including_glossary':words,'source_entries':len(sources),'distinct_source_urls':len({s.get('url') for s in sources}),'numbered_figures':counter,'chapters':28,'graduate_pages':doc.map.get('ch-29',0)-doc.map.get('ch-26',0),'page_map':doc.map}
    (ROOT/'book_stats.json').write_text(json.dumps(stats,indent=2))
    manuscript='\n\n'.join(norm(raw) for _,raw in raws)+'\n\n# Research guide\n\n'+'\n\n'.join(source_text(r) for r in sources)
    (ROOT/'Factory_Manuscript.md').write_text(manuscript,encoding='utf-8')
    (OUT/'Factory_Research.json').write_text(json.dumps(sources,ensure_ascii=False,indent=2),encoding='utf-8')
    with (OUT/'Factory_Research.csv').open('w',encoding='utf-8-sig',newline='') as f:
        fields=['id','title','organization','date','url','accessed','status','supports','limitation'];w=csv.DictWriter(f,fieldnames=fields,extrasaction='ignore');w.writeheader();w.writerows(sources)
    html_reader(raws,sources)
    print(json.dumps(stats,indent=2))

if __name__=='__main__':main()
