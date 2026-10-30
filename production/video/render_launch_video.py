"""Original vector motion graphics. No third-party footage or image manipulation."""
from pathlib import Path
import sys, math, json, subprocess
import imageio_ffmpeg
from PIL import Image, ImageDraw, ImageFont

ROOT=Path(__file__).resolve().parent
OUT=ROOT/'exports'; OUT.mkdir(exist_ok=True)
W,H,FPS,DURATION=1080,1350,24,25
C={'bg':'#0b171b','lime':'#d9ff6a','cream':'#f3f0e3','muted':'#a7b9af','grid':'#223b39','cyan':'#71d5e7','line':'#526e60'}
FONT=Path('C:/Windows/Fonts')
bold=lambda n:ImageFont.truetype(str(FONT/'arialbd.ttf'),n)
normal=lambda n:ImageFont.truetype(str(FONT/'arial.ttf'),n)
mono=lambda n:ImageFont.truetype(str(FONT/'consola.ttf'),n)
fonts={n:bold(n) for n in [28,32,42,52,70,80,90,98,106]}
data=json.loads((ROOT/'control-video-data.json').read_text())

def text(d,xy,s,size=42,fill=None,font=None):d.text(xy,s,font=font or fonts.get(size) or bold(size),fill=fill or C['cream'],spacing=5)
def line(d,points,fill,width=2):d.line(points,fill=fill,width=width,joint='curve')
def circle(d,x,y,r,fill=None,outline=None,width=2):d.ellipse((x-r,y-r,x+r,y+r),fill=fill,outline=outline,width=width)
def ease(q):q=max(0,min(1,q));return q*q*(3-2*q)
def pill(d,xy,s):x,y=xy;d.rounded_rectangle((x,y,x+len(s)*16+36,y+48),radius=4,fill=C['lime']);text(d,(x+18,y+10),s,28,C['bg'],mono(25))

def base(t,section):
 im=Image.new('RGB',(W,H),C['bg']);d=ImageDraw.Draw(im)
 for x in range(60,W,60):line(d,[(x,0),(x,H)],C['grid'],1)
 for y in range(0,H,60):line(d,[(0,y),(W,y)],C['grid'],1)
 d.rectangle((0,0,W,420),fill=C['bg']);d.rectangle((0,1120,W,H),fill=C['bg'])
 text(d,(64,55),'F / THE FACTORY',28,C['lime'],mono(28))
 text(d,(64,104),section,28,C['muted'],mono(24))
 line(d,[(64,147),(1016,147)],C['line'])
 text(d,(64,1256),'ditchthescroll.com/factory',32,C['cream'],mono(32))
 line(d,[(64,1320),(64+952*t/DURATION,1320)],C['lime'],4)
 return im,d

def arm(d,q,ybase=910,length1=285,length2=240):
 a1=math.radians(12+55*ease(q));a2=math.radians(105-145*ease(q))
 b=(250,ybase);j=(b[0]+length1*math.cos(a1),b[1]-length1*math.sin(a1));e=(j[0]+length2*math.cos(a1+a2),j[1]-length2*math.sin(a1+a2))
 line(d,[(100,ybase+25),(960,ybase+25)],C['line'],3)
 line(d,[b,j,e],C['line'],44);line(d,[b,j,e],C['cream'],25)
 for p,r in [(b,29),(j,23),(e,15)]:circle(d,*p,r,C['bg'],C['lime'],5)
 d.rounded_rectangle((175,ybase+18,325,ybase+60),radius=5,fill=C['lime'])
 # Target is final endpoint of this exact two-link trajectory.
 aa,bb=math.radians(67),math.radians(-40)
 target=(250+length1*math.cos(aa)+length2*math.cos(aa+bb),ybase-length1*math.sin(aa)-length2*math.sin(aa+bb))
 circle(d,*target,36,None,C['lime'],2);circle(d,*target,46,None,C['line'],1)
 text(d,(target[0]+58,target[1]-20),'TARGET',28,C['lime'],mono(25))
 err=math.hypot(e[0]-target[0],e[1]-target[1])/length1
 text(d,(64,1027),f'JOINT 1  {math.degrees(a1):05.1f}°     JOINT 2  {math.degrees(a2):+06.1f}°',28,C['muted'],mono(28))
 return err

def frame(t):
 if t<4:
  im,d=base(t,'A PLAYGROUND FOR FUTURE BUILDERS')
  text(d,(64,190),'WHAT IS THIS',90);text(d,(64,285),'MATH EVEN FOR?',90,C['lime'])
  arm(d,.15+.3*math.sin(t*.8)**2,ybase=930)
  text(d,(64,1145),'Give the equation a machine.',42)
 elif t<9:
  q=(t-4)/4.5;im,d=base(t,'01 / ROBOT ARM TARGET CHALLENGE')
  text(d,(64,190),'GIVE IT',106);text(d,(64,300),'A TARGET.',106,C['lime'])
  err=arm(d,q)
  pill(d,(64,455),'TRIGONOMETRY → REACH')
  text(d,(64,1145),'Two joints. One useful connection.',42)
 elif t<14:
  im,d=base(t,'02 / ROVER ROUTE PLANNING')
  text(d,(64,190),'FIND A WAY',98);text(d,(64,292),'THROUGH.',98,C['lime'])
  cell=76;x0=235;y0=465;route=[(0,6),(0,5),(1,5),(1,4),(1,3),(2,3),(3,3),(3,2),(4,2),(5,2),(5,1),(6,1),(6,0)]
  rocks={(2,5),(3,5),(4,4),(5,4),(0,2),(2,1),(4,1),(6,3),(2,6)}
  for y in range(7):
   for x in range(7):
    xx,yy=x0+x*cell,y0+y*cell;d.rectangle((xx,yy,xx+cell-5,yy+cell-5),outline=C['line'],width=1)
    if (x,y) in rocks:d.polygon([(xx+15,yy+18),(xx+40,yy+10),(xx+61,yy+35),(xx+46,yy+60),(xx+15,yy+50)],fill='#4c6054')
  points=[(x0+(x+.45)*cell,y0+(y+.45)*cell) for x,y in route]
  line(d,points,C['line'],3)
  progress=min(12,max(0,(t-9)*3));n=min(11,int(progress));f=progress-n
  if progress>=12:n=11;f=1
  line(d,points[:n+1]+[(points[n][0]+(points[n+1][0]-points[n][0])*f,points[n][1]+(points[n+1][1]-points[n][1])*f)],C['lime'],5)
  cx=points[n][0]+(points[n+1][0]-points[n][0])*f;cy=points[n][1]+(points[n+1][1]-points[n][1])*f
  d.rounded_rectangle((cx-22,cy-25,cx+22,cy+25),radius=5,fill=C['lime']);line(d,[(cx-27,cy-28),(cx-27,cy+28)],C['cream'],7);line(d,[(cx+27,cy-28),(cx+27,cy+28)],C['cream'],7)
  circle(d,*points[-1],29,None,C['cyan'],3)
  text(d,(64,1045),f'ROUTE  {min(12,int(progress)):02}/12 STEPS   /   OBSTACLES AVOIDED',28,C['muted'],mono(28))
  text(d,(64,1145),'A plan is something you can test.',42)
 elif t<19:
  im,d=base(t,'03 / THE CONTROL ROOM')
  text(d,(64,190),'MAKE IT STOP',98);text(d,(64,292),'WHERE YOU WANT.',80,C['lime'])
  x0,y0=85,950;gw,gh=910,430;duration=min(12,(t-14)*3)
  line(d,[(x0,500),(x0,y0),(x0+gw,y0)],C['line'],3)
  yy=lambda v:y0-v/1.9*gh
  line(d,[(x0,yy(1)),(x0+gw,yy(1))],C['lime'],2)
  text(d,(x0,yy(1)-42),'TARGET 1.00 m',28,C['lime'],mono(25))
  for key,col in [('ring','#cf8e70'),('calm',C['cyan'])]:
   rows=[r for r in data[key]['rows'] if r['t']<=duration]
   pts=[(x0+r['t']/12*gw,yy(r['x'])) for r in rows[::3]]
   if len(pts)>1:line(d,pts,col,4);circle(d,*pts[-1],7,col)
  text(d,(85,990),'0 s',28,C['muted'],mono(25));text(d,(935,990),'12 s',28,C['muted'],mono(25))
  text(d,(64,1060),'LOW DAMPING',28,'#cf8e70',mono(27));text(d,(545,1060),'USEFUL DAMPING',28,C['cyan'],mono(27))
  text(d,(64,1145),'The derivative becomes the brake.',42)
 else:
  im,d=base(t,'THE FACTORY THAT BUILDS THE FUTURE')
  text(d,(64,204),'MAKE',106);text(d,(64,325),'THE MATH',106);text(d,(64,446),'MOVE.',106,C['lime'])
  text(d,(64,670),'12',90,C['lime']);text(d,(230,691),'models & games',52)
  text(d,(64,790),'16',90,C['lime']);text(d,(230,811),'project blueprints',52)
  text(d,(64,910),'34',90,C['lime']);text(d,(230,931),'connected lessons',52)
  pill(d,(64,1065),'FREE. NO SIGN-UP.')
  text(d,(64,1150),'Play. Learn. Build something real.',42)
 return im

ffmpeg=imageio_ffmpeg.get_ffmpeg_exe()
outfile=OUT/'Factory_Make_The_Math_Move.mp4'
proc=subprocess.Popen([ffmpeg,'-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','-','-an','-c:v','libx264','-preset','fast','-crf','19','-pix_fmt','yuv420p','-movflags','+faststart',str(outfile)],stdin=subprocess.PIPE,stderr=(ROOT/'video-render.log').open('w'))
try:
 for i in range(FPS*DURATION):
  im=frame(i/FPS);proc.stdin.write(im.tobytes())
  if i in [0,144,264,384,504]:im.save(ROOT/f'video-review-{i}.png')
  if i%(FPS*5)==0:print(f'Rendered {i//FPS}/{DURATION}s',flush=True)
finally:proc.stdin.close()
if proc.wait()!=0:raise RuntimeError('FFmpeg render failed; inspect log')
print(f'Created {outfile.name}: {outfile.stat().st_size:,} bytes',flush=True)
