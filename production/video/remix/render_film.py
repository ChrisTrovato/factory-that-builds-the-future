"""Factory launch recut: authentic local speech, local music, original graphics.
Run with the bundled Python. Sources stay intact. No external footage fetched.
"""
from pathlib import Path
import sys, subprocess, math, json, wave, re, os
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

HERE=Path(__file__).resolve().parent
WORK=HERE.parent
REPO=HERE.parents[2]
OUT=WORK/'exports'; OUT.mkdir(exist_ok=True)
import imageio_ffmpeg
FF=imageio_ffmpeg.get_ffmpeg_exe()
SOURCE=Path(os.environ.get('FACTORY_ARCHIVE_DIR', str(WORK/'local-source-media')))
if not SOURCE.exists(): raise RuntimeError('Set FACTORY_ARCHIVE_DIR to your lawfully available Zero to One source package; third-party source footage/music are not distributed here.')
ART=REPO/'public/assets'
W,H,FPS,DURATION=1080,1350,24,39.25
BG='#091519'; CREAM='#f4f0e3'; LIME='#d9ff6a'; MUTED='#aebdb4'; CYAN='#71d5e7'
FONTS={}
def font(n,style='bold'):
    key=(n,style)
    if key not in FONTS:
        FONTS[key]=ImageFont.truetype(str(Path('C:/Windows/Fonts')/({'bold':'arialbd.ttf','normal':'arial.ttf','mono':'consola.ttf','serif':'georgiai.ttf'}[style])),n)
    return FONTS[key]
def txt(d,xy,s,n=40,col=CREAM,style='bold',anchor=None):
    d.text(xy,s,font=font(n,style),fill=col,anchor=anchor,spacing=3)
def ease(q):
    q=max(0,min(1,q));return 1-(1-q)**3
def cover(im,w,h,scale=1,focus=.5):
    r=max(w/im.width,h/im.height)*scale
    nw,nh=round(im.width*r),round(im.height*r)
    z=im.resize((nw,nh),Image.Resampling.BICUBIC)
    x=round((nw-w)*focus);y=round((nh-h)*.5)
    return z.crop((x,y,x+w,y+h))
def darken(im,amount=.5):return Image.blend(im,Image.new('RGB',im.size,BG),amount)
def run(args,**kwargs):
    return subprocess.run([FF,'-hide_banner','-loglevel','error','-y']+list(map(str,args)),check=True,**kwargs)

# Reuse the exact original learning-model drawing functions without invoking its render.
legacy_src=(WORK/'render_launch_video.py').read_text(encoding='utf-8').split('ffmpeg=imageio_ffmpeg.get_ffmpeg_exe()')[0]
legacy={'__file__':str(WORK/'render_launch_video.py')}
exec(compile(legacy_src,str(WORK/'render_launch_video.py'),'exec'),legacy)

images={n:Image.open(ART/(n+'.png')).convert('RGB') for n in ['shipyard-hero','earth-workbench','lunar-workshop']}
screens={n:Image.open(REPO/'docs/screenshots'/('site-'+n+'.png')).convert('RGB') for n in ['home','projects']}
speech=SOURCE/'03 Source Media/Thiel_Opening_Quote_PBS_04m35s.mp4'
quote_bytes=subprocess.check_output([FF,'-hide_banner','-loglevel','error','-i',str(speech),'-vf','scale=1024:576,fps=24','-f','rawvideo','-pix_fmt','rgb24','-'])
quote=np.frombuffer(quote_bytes,np.uint8).reshape(-1,576,1024,3)
assert 100<=len(quote)<=102,len(quote)

# Music follows the prior intro's quiet breakdown, then stays continuous past the
# old 19.25-second silence. Dialogue remains the authentic separate stem.
SR=44100; samples=round(DURATION*SR)
track=SOURCE/'03 Source Media/Originals/Carpenter_Brut_Escape_From_Midwich_Valley_Purchased.flac'
def audio_segment(path,start,length):
    raw=subprocess.check_output([FF,'-hide_banner','-loglevel','error','-ss',str(start),'-i',str(path),'-t',str(length),'-vn','-ac','2','-ar',str(SR),'-f','f32le','-'])
    return np.frombuffer(raw,'<f4').reshape(-1,2).copy()
music=np.zeros((samples,2),np.float32)
intro=audio_segment(track,280,4.35)*.19
intro[:round(.08*SR)]*=np.linspace(0,1,round(.08*SR))[:,None]
intro[-round(.15*SR):]*=np.linspace(1,0,round(.15*SR))[:,None]
music[:len(intro)]+=intro
body=audio_segment(track,10,DURATION-4.25)*.56
body[:round(.1*SR)]*=np.linspace(0,1,round(.1*SR))[:,None]
body[-round(1.5*SR):]*=np.linspace(1,0,round(1.5*SR))[:,None]
music[round(4.25*SR):round(4.25*SR)+len(body)]+=body
voice=audio_segment(SOURCE/'04 Audio/01_Dialogue_Thiel_PBS_48s.wav',0,4.25)
mix=music.copy();mix[:len(voice)]+=voice
rng=np.random.default_rng(739)
for pos in [4.25,8.25,13.25,18.25,23.25,29.25,33.25]:
    st=round(pos*SR);t=np.arange(round(.48*SR))/SR
    hit=(np.sin(2*np.pi*(57*t-18*t*t))*np.exp(-11*t)*.09+rng.normal(0,1,len(t))*np.exp(-36*t)*.008)
    hit[:200]*=np.linspace(0,1,200)
    mix[st:st+len(hit)]+=hit[:,None]
assert np.isfinite(mix).all()
peak=float(np.abs(mix).max())
if peak>.89:mix*=.89/peak
with wave.open(str(HERE/'mix.wav'),'wb') as f:
    f.setnchannels(2);f.setsampwidth(2);f.setframerate(SR);f.writeframes((mix*32767).astype('<i2').tobytes())
energies=[]
for i in range(round(DURATION*FPS)):
    a=music[round(i/FPS*SR):round((i+1)/FPS*SR)]
    energies.append(float(np.sqrt(np.mean(a*a))))

def footer(im,t,label='THE FACTORY / BUILD WHAT COMES NEXT'):
    d=ImageDraw.Draw(im)
    txt(d,(60,1244),label,23,MUTED,'mono')
    d.line((60,1310,1020,1310),fill='#30433e',width=2)
    d.line((60,1310,60+960*t/DURATION,1310),fill=LIME,width=4)
    return im

def title_scene(t,start,asset,lines,sub,focus):
    q=t-start
    im=cover(images[asset],W,H,1.02+.035*q,focus)
    # Clear title over a gradient, preserving a bright image in the lower half.
    shade=Image.new('RGBA',(W,H));a=np.zeros((H,W,4),np.uint8)
    a[:,:,:3]=[4,14,18]
    a[:,:,3]=(np.linspace(215,25,H)[:,None]).astype(np.uint8)
    im=Image.alpha_composite(im.convert('RGBA'),Image.fromarray(a)).convert('RGB')
    d=ImageDraw.Draw(im)
    txt(d,(60,72),'THE FACTORY / A LEARNING WORLD',27,LIME,'mono')
    y=218+round(30*(1-ease(q/.45)))
    for j,s in enumerate(lines):txt(d,(60,y+j*115),s,98,LIME if j==len(lines)-1 else CREAM)
    txt(d,(60,1040),sub,35,CREAM,'normal')
    txt(d,(60,1130),'ORIGINAL SPECULATIVE CONCEPT ART',22,MUTED,'mono')
    return footer(im,t)

def model_scene(t):
    lt=t-4.25
    im=legacy['frame'](lt)
    d=ImageDraw.Draw(im)
    # Recut to show the mechanical payoff immediately, with the same site palette.
    d.rectangle((0,170,W,410),fill=BG)
    if t<13.25:
        txt(d,(64,190),'MAKE THE',100);txt(d,(64,297),'MATH MOVE.',100,LIME)
    elif t<18.25:
        txt(d,(64,190),'TURN A PLAN',90);txt(d,(64,290),'INTO A MISSION.',83,LIME)
    else:
        txt(d,(64,190),'MAKE IT STOP',90);txt(d,(64,290),'WHERE YOU WANT.',79,LIME)
    # Editorial strip makes it clear this is a visualization of the learning models.
    d.rectangle((0,1215,W,H),fill=BG)
    txt(d,(64,1240),'TRY THESE MODELS AT THE FACTORY',25,MUTED,'mono')
    for k in range(24):
        amp=energies[min(len(energies)-1,round(t*FPS))]
        h=5+round(amp*120*(.5+.5*math.sin(k*.67+t*5)**2))
        d.line((64+k*15,1306-h,64+k*15,1306),fill=LIME,width=5)
    txt(d,(650,1280),'PLAY / LEARN / BUILD',25,LIME,'mono')
    return im

def browser_scene(t):
    q=t-23.25;projects=q>=3
    im=Image.new('RGB',(W,H),BG);d=ImageDraw.Draw(im)
    txt(d,(60,62),'THIS IS A PLACE TO START.',27,LIME,'mono')
    txt(d,(60,145),'PLAY IT.',92);txt(d,(60,245),'BUILD IT.' if projects else 'UNDERSTAND IT.',78,LIME)
    screen=screens['projects' if projects else 'home']
    # Actual site capture, framed rather than passed off as a product mockup.
    top=365;sh=810;sw=960
    crop=screen.crop((0,0,screen.width-15,min(screen.height,1080)))
    frame=cover(crop,sw,sh,1+.018*(q%3),.48)
    im.paste(frame,(60,top+43));d=ImageDraw.Draw(im)
    d.rectangle((60,top,1020,top+43),fill='#243833')
    for j,col in enumerate(['#ad7264','#c2b064','#88ac7d']):d.ellipse((77+j*22,top+14,88+j*22,top+25),fill=col)
    txt(d,(174,top+10),'ditchthescroll.com/factory'+('/#/projects' if projects else ''),19,CREAM,'mono')
    d.rectangle((60,top,1020,top+43+sh),outline='#6b8170',width=2)
    return footer(im,t,'ACTUAL WEBSITE / FREE / NO SIGNUP')

def montage(t):
    q=t-29.25
    asset='earth-workbench' if q<2 else 'shipyard-hero'
    im=darken(cover(images[asset],W,H,1+.025*q,.64),.24)
    # A dark top panel holds copy while the scene stays legible below.
    overlay=Image.new('RGBA',(W,H),(0,0,0,0));d=ImageDraw.Draw(overlay)
    d.rectangle((0,0,W,540),fill=(7,18,21,222))
    im=Image.alpha_composite(im.convert('RGBA'),overlay).convert('RGB');d=ImageDraw.Draw(im)
    txt(d,(60,70),'START SMALL. KEEP THE HORIZON.',26,LIME,'mono')
    lines=['FROM YOUR','WORKBENCH.'] if q<2 else ['TO WHAT','COMES NEXT.']
    for j,s in enumerate(lines):txt(d,(60,210+j*110),s,97,LIME if j else CREAM)
    txt(d,(60,1140),'ORIGINAL CONCEPT ART',22,MUTED,'mono')
    return footer(im,t)

def ending(t):
    q=t-33.25
    im=darken(cover(images['shipyard-hero'],W,H,1.04+.01*q,.73),.84);d=ImageDraw.Draw(im)
    txt(d,(60,68),'THE FACTORY THAT BUILDS THE FUTURE',25,LIME,'mono')
    for j,s in enumerate(['THE FUTURE','NEEDS','BUILDERS.']):
        txt(d,(60,191+j*114),s,100,LIME if j==2 else CREAM)
    txt(d,(60,595),'Make the math mean something.',40,CREAM,'normal')
    for j,(n,l1,l2) in enumerate([('12','MODELS','& GAMES'),('16','PROJECT','BLUEPRINTS'),('34','CONNECTED','LESSONS')]):
        x=60+j*325; y=725+round(28*(1-ease((q-j*.13)/.5)))
        d.line((x,y-20,x+285,y-20),fill='#526956',width=2)
        txt(d,(x,y),n,100,LIME)
        txt(d,(x,y+117),l1,24,CREAM,'mono');txt(d,(x,y+149),l2,24,CREAM,'mono')
    d.rounded_rectangle((60,1015,1020,1170),radius=8,fill=LIME)
    txt(d,(540,1044),'FREE. NO SIGNUP.',30,BG,'bold',anchor='mt')
    txt(d,(540,1095),'ditchthescroll.com/factory',39,BG,'bold',anchor='mt')
    return footer(im,t,'ONE IDEA. ONE EXPERIMENT. YOUR NEXT STEP.')

def frame(t):
    if t<4.25:
        im=Image.new('RGB',(W,H),BG);d=ImageDraw.Draw(im)
        txt(d,(60,80),'PETER THIEL',44,CREAM)
        txt(d,(60,142),'2016 RNC / PBS NEWSHOUR',26,MUTED,'mono')
        pic=Image.fromarray(quote[min(len(quote)-1,int(t*FPS))]).resize((1080,608),Image.Resampling.LANCZOS)
        im.paste(pic,(0,250));d=ImageDraw.Draw(im)
        d.line((60,925,140,925),fill=LIME,width=5)
        txt(d,(60,962),'“But most of all,',64)
        if t>=1.35:
            txt(d,(60,1042),'I am proud to be',64)
            txt(d,(60,1122),'an American.”',64,LIME)
        txt(d,(60,1260),'ARCHIVAL EXCERPT / JULY 21, 2016',24,MUTED,'mono')
    elif t<6.25:
        im=title_scene(t,4.25,'shipyard-hero',['A FUTURE','WORTH','BUILDING.'],'Keep the ambition in view.',.7)
    elif t<8.25:
        im=title_scene(t,6.25,'earth-workbench',['STARTS WITH','LEARNING','HOW.'],'The next step is closer than you think.',.64)
    elif t<23.25:im=model_scene(t)
    elif t<29.25:im=browser_scene(t)
    elif t<33.25:im=montage(t)
    else:im=ending(t)
    # Six-frame warm flash over visual cuts, zero interruption to the audio.
    for cut in [4.25,6.25,8.25,13.25,18.25,23.25,26.25,29.25,31.25,33.25]:
        if 0<=t-cut<.1667:
            im=Image.blend(im,Image.new('RGB',(W,H),'#e9f0ce'),.14*(1-(t-cut)/.1667))
    return im

def render():
    outfile=HERE/'picture.mp4'
    log=(HERE/'render.log').open('w')
    p=subprocess.Popen([FF,'-hide_banner','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','-','-an','-c:v','libx264','-preset','fast','-crf','18','-pix_fmt','yuv420p','-movflags','+faststart',str(outfile)],stdin=subprocess.PIPE,stderr=log)
    keyframes=[0,2,5,7,10.5,15.5,20.5,24.5,27.5,30,32,36]
    keyindexes={round(s*FPS):s for s in keyframes}
    for i in range(round(DURATION*FPS)):
        im=frame(i/FPS);p.stdin.write(im.tobytes())
        if i in keyindexes:im.save(HERE/f'frame-{keyindexes[i]:05.2f}.jpg',quality=92)
        if i%(FPS*5)==0:print(f'Picture {i/FPS:.0f}/{DURATION}s',flush=True)
    p.stdin.close()
    if p.wait():raise RuntimeError('Picture render failed')
    log.close()
    measure=subprocess.run([FF,'-hide_banner','-i',str(HERE/'mix.wav'),'-af','loudnorm=I=-16:TP=-1.5:LRA=9:print_format=json','-f','null','-'],capture_output=True,text=True,check=True)
    report=json.loads(re.search(r'\{\s*"input_i".*?\}',measure.stderr,re.S).group())
    filt='loudnorm=I=-16:TP=-1.5:LRA=9:measured_I={input_i}:measured_TP={input_tp}:measured_LRA={input_lra}:measured_thresh={input_thresh}:offset={target_offset}:linear=true'.format(**report)
    final=OUT/'Factory_Thiel_Future_Builders.mp4'
    run(['-i',outfile,'-i',HERE/'mix.wav','-map','0:v:0','-map','1:a:0','-c:v','copy','-af',filt,'-c:a','aac','-b:a','256k','-ar','48000','-movflags','+faststart','-metadata','title=The Factory — A Future Worth Building','-metadata','comment=Authentic Peter Thiel archival excerpt followed by original Factory editorial and learning-model animation.',final])
    (HERE/'audio-analysis.json').write_text(json.dumps({'pre_normalize_peak':peak,'measurement':report,'duration':DURATION},indent=2))
    board=Image.new('RGB',(1080,1500),BG);d=ImageDraw.Draw(board)
    for i,s in enumerate(keyframes):
        im=Image.open(HERE/f'frame-{s:05.2f}.jpg').resize((250,312),Image.Resampling.LANCZOS)
        x=15+(i%4)*270;y=30+(i//4)*490
        board.paste(im,(x,y));txt(d,(x,y+325),f'{s:05.2f}s',24,LIME,'mono')
    board.save(OUT/'Factory_Thiel_Film_Storyboard.jpg',quality=94)
    frame(36).save(OUT/'Factory_Thiel_Film_Cover.png')
    print(json.dumps({'output':str(final),'bytes':final.stat().st_size,'duration':DURATION,'frames':round(DURATION*FPS)},indent=2),flush=True)

if __name__=='__main__':render()
