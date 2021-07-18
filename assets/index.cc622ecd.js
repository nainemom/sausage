import{o as e,c as t,r as i,a as n,b as s,t as o,w as a,v as r,d as l,e as c,f as d,g as p,F as u,h as m,i as h}from"./vendor.81142d2e.js";let g;const f={},b=function(e,t){if(!t)return e();if(void 0===g){const e=document.createElement("link").relList;g=e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(t.map((e=>{if(e in f)return;f[e]=!0;const t=e.endsWith(".css"),i=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${i}`))return;const n=document.createElement("link");return n.rel=t?"stylesheet":g,t||(n.as="script",n.crossOrigin=""),n.href=e,document.head.appendChild(n),t?new Promise(((e,t)=>{n.addEventListener("load",e),n.addEventListener("error",t)})):void 0}))).then((()=>e()))};const v={props:{name:{type:String,default:"close"},size:{type:Number,default:32}},data:()=>({svgContent:null}),async mounted(){const{default:e}=await function(e){switch(e){case"../../assets/icons/account-voice.svg":return b((()=>import("./account-voice.ae9c407c.js")),void 0);case"../../assets/icons/arrow-left.svg":return b((()=>import("./arrow-left.5ef3e1f7.js")),void 0);case"../../assets/icons/arrow-right.svg":return b((()=>import("./arrow-right.6bb00c6e.js")),void 0);case"../../assets/icons/close.svg":return b((()=>import("./close.63838621.js")),void 0);case"../../assets/icons/folder-outline.svg":return b((()=>import("./folder-outline.36dcb512.js")),void 0);case"../../assets/icons/lock-reset.svg":return b((()=>import("./lock-reset.3493f433.js")),void 0);case"../../assets/icons/logo.svg":return b((()=>import("./logo.35dc1e26.js")),void 0);case"../../assets/icons/movie-outline.svg":return b((()=>import("./movie-outline.ca6ff2a9.js")),void 0);case"../../assets/icons/pause.svg":return b((()=>import("./pause.d43f36d0.js")),void 0);case"../../assets/icons/play.svg":return b((()=>import("./play.7bb78c33.js")),void 0);case"../../assets/icons/subtitles-outline.svg":return b((()=>import("./subtitles-outline.49cb54bf.js")),void 0);case"../../assets/icons/translate.svg":return b((()=>import("./translate.a475fc2f.js")),void 0);case"../../assets/icons/upload.svg":return b((()=>import("./upload.bbdd5cba.js")),void 0);case"../../assets/icons/web.svg":return b((()=>import("./web.cb0cde69.js")),void 0);default:return Promise.reject(new Error("Unknown variable dynamic import: "+e))}}(`../../assets/icons/${this.name}.svg`),t=await fetch(e),i=await t.text();this.$el.innerHTML=i},style({className:e,keyFrames:t}){const{size:i}=this;return[t("loadingAnimation",{"0%":{opacity:1},"50%":{opacity:0},"100%":{opacity:1}}),e("icon",{display:"inline-block",width:`${i}px`,height:`${i}px`,lineHeight:`${i}px`,verticalAlign:"middle",marginBottom:this.size/8+"px","&:empty":{"&::before":{content:'"-"',animationName:t("loadingAnimation"),animationDuration:"0.6s",fontWeight:"bold",animationIterationCount:"infinite"},borderRadius:"100%"},"& > svg":{width:"100%",height:"100%"}})]}};v.render=function(i,n,s,o,a,r){return e(),t("div",{class:i.$style.icon},null,2)};const y={components:{Icon:v},inject:["$app"],emits:["done"],data:()=>({files:Object.freeze([]),dragEnter:!1}),computed:{movieFile(){return this.files.find((e=>e.name.endsWith(".mp4")||e.name.endsWith(".mkv")))},subtitleFile(){const e=this.files.find((e=>e.name.endsWith(".srt")||e.name.endsWith(".vtt")));return e&&e.name.endsWith(".vtt")?e:this.files.find((e=>e.name.endsWith(".srt")))},miniFileNames(){const e=e=>e.length>19?`${e.substr(0,8)}...${e.substr(-8)}`:e;return{movie:this.movieFile?e(this.movieFile.name):null,subtitle:this.subtitleFile?e(this.subtitleFile.name):null}},isReadyToDone(){return this.movieFile&&this.subtitleFile}},watch:{movieFile(e){this.$app.movie=e},subtitleFile(e){this.$app.subtitle=e}},methods:{openFileSelectorDialog(){this.$refs.file.click()},onFileSelect(e){this.addFiles([...e.target.files])},onDragEnter(){this.dragEnter=!0},onDragLeave(e){e.clientX||e.clientY||(this.dragEnter=!1)},onDrop(e){this.dragEnter=!1,this.addFiles([...e.dataTransfer.files])},async addFiles(e){const t=e.filter((e=>"text/vtt"===e.type||e.name.endsWith(".vtt"))),i=e.filter((e=>["video/x-matroska","video/mp4"].includes(e.type)||e.name.endsWith(".mkv")||e.name.endsWith(".mp4"))),n=e.filter((e=>e.name.endsWith(".srt")||"application/x-subrip"===e.type));t.push(...(await Promise.all(n.map((e=>(e=>new Promise(((t,i)=>{const n=new FileReader;n.readAsText(e),n.onloadend=e=>t(e.target.result),n.onerror=e=>i(e)})))(e))))).map(((e,t)=>((e,t)=>{const i=new Blob([`WEBVTT\n\n${t.split("\n").map((e=>e.match(/^\d+:\d+:\d+,\d+\s-->\s\d+:\d+:\d+,\d+/gm)?e.split(",").join("."):e)).join("\n")}`],{type:"text/vtt"});return new File([i],e,{type:"text/vtt"})})(n[t].name,e)))),this.files=Object.freeze([...t,...i,...this.files])},done(){this.isReadyToDone&&this.$emit("done")}},style:({className:e})=>[e("setupForm",{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontSize:"1rem",background:"#eee","& .github":{position:"fixed",right:0,bottom:0,padding:"16px","& a":{textDecoration:"underline"}},'& input[type="file"]':{display:"none"},"& button, & input, & select":{border:"solid 1px #ccc",height:"36px",padding:"0 12px",lineHeight:"36px",appearance:"none",whiteSpace:"nowrap"},"& button":{cursor:"pointer","&:not(:disabled):hover, &:not(:disabled):focus":{background:"rgba(0, 0, 0, 0.05)"},"&:not(:disabled):active":{background:"rgba(0, 0, 0, 0.1)"},"&:disabled":{cursor:"not-allowed",fill:"#888",color:"#888"}},"& select":{cursor:"pointer","&:not(:disabled):hover, &:not(:disabled):focus":{background:"rgba(0, 0, 0, 0.05)"}},"& input":{width:"76px"},"& > .header":{width:"360px",maxWidth:"360px",display:"flex",flexDirection:"row",justifyContent:"center",marginBottom:"8px","& > div:first-child":{marginRight:"8px"},"& > div:last-child":{flexGrow:1},"& h1":{fontSize:"1.3rem",marginBottom:"3px"},"& p":{fontSize:"0.9rem",color:"#555"}},"& > .form":{background:"#fff",border:"solid 1px #ccc",overflow:"hidden",width:"360px",padding:"16px 0",position:"relative","&.drag-enter":{border:"dotted 1px #ccc","& > *:not(.drag-enter-text)":{visibility:"hidden"},"& > .drag-enter-text":{fontSize:"1.4rem",display:"block",width:"100%",textAlign:"center",position:"absolute",color:"#444",fill:"#444",top:"50%",left:"50%",transform:"translate(-50%, -50%)"}},"& > .drag-enter-text":{display:"none"},"& > .line":{height:"1px",background:"#ccc",marginBottom:"16px"},"& > .form-element":{display:"flex",flexDirection:"row",alignItems:"center",padding:"0 16px","&:not(.last)":{marginBottom:"16px"},"& > .title":{color:"#444",fill:"#444",flexGrow:1},"& > .content":{paddingLeft:"16px"}}}})]},x={class:"header"},$=n("div",null,[n("h1",null," Sausage "),n("p",null," Learn Foreign Languages via Movies Subtitle ")],-1),w={class:"form-element"},S={class:"title"},k=s(" Video File: "),C={class:"content"},_={class:"form-element"},L={class:"title"},T=s(" Subtitle File: "),P={class:"content"},D={class:"form-element"},E={class:"title"},F=s(" Subtitle Language: "),j={class:"content"},z={class:"form-element"},I={class:"title"},O=s(" My Primary Language: "),R={class:"content"},A={class:"form-element"},U={class:"title"},V=s(" Translator Service: "),W={class:"content"},N=n("option",{value:"google"}," Google ",-1),H=n("option",{value:"bing"}," Bing ",-1),M=n("div",{class:"line"},null,-1),B={class:"form-element last"},G=n("div",{class:"title"},null,-1),J={class:"content"},X=s(" Play "),q={class:"drag-enter-text"},Y=s(" Drop Files Here "),K=n("div",{class:"github"},[s(" Github Repo: "),n("a",{href:"https://github.com/nainemom/sausage",target:"__blank"}," Sausage ")],-1);y.render=function(d,p,u,m,h,g){const f=i("Icon");return e(),t("div",{class:d.$style.setupForm,onDragover:p[8]||(p[8]=c((()=>{}),["prevent"])),onDragenter:p[9]||(p[9]=(...e)=>g.onDragEnter&&g.onDragEnter(...e)),onDragleave:p[10]||(p[10]=(...e)=>g.onDragLeave&&g.onDragLeave(...e)),onDrop:p[11]||(p[11]=c(((...e)=>g.onDrop&&g.onDrop(...e)),["prevent"]))},[n("div",x,[n("div",null,[n(f,{size:48,name:"logo"})]),$]),n("div",{class:["form",[h.dragEnter&&"drag-enter"]]},[n("input",{ref:"file",type:"file",onInput:p[1]||(p[1]=(...e)=>g.onFileSelect&&g.onFileSelect(...e))},null,544),n("div",w,[n("div",S,[n(f,{size:22,name:"movie-outline"}),k]),n("div",C,[n("button",{onClick:p[2]||(p[2]=(...e)=>g.openFileSelectorDialog&&g.openFileSelectorDialog(...e))},[n(f,{size:22,name:"folder-outline"}),s(" "+o(g.movieFile?g.miniFileNames.movie:"Browse..."),1)])])]),n("div",_,[n("div",L,[n(f,{size:22,name:"subtitles-outline"}),T]),n("div",P,[n("button",{onClick:p[3]||(p[3]=(...e)=>g.openFileSelectorDialog&&g.openFileSelectorDialog(...e))},[n(f,{size:22,name:"folder-outline"}),s(" "+o(g.subtitleFile?g.miniFileNames.subtitle:"Browse..."),1)])])]),n("div",D,[n("div",E,[n(f,{size:22,name:"web"}),F]),n("div",j,[a(n("input",{"onUpdate:modelValue":p[4]||(p[4]=e=>g.$app.subtitleLang=e)},null,512),[[r,g.$app.subtitleLang]])])]),n("div",z,[n("div",I,[n(f,{size:22,name:"account-voice"}),O]),n("div",R,[a(n("input",{"onUpdate:modelValue":p[5]||(p[5]=e=>g.$app.primaryLang=e)},null,512),[[r,g.$app.primaryLang]])])]),n("div",A,[n("div",U,[n(f,{size:22,name:"translate"}),V]),n("div",W,[a(n("select",{"onUpdate:modelValue":p[6]||(p[6]=e=>g.$app.translatorService=e)},[N,H],512),[[l,g.$app.translatorService]])])]),M,n("div",B,[G,n("div",J,[n("button",{disabled:!g.isReadyToDone,onClick:p[7]||(p[7]=(...e)=>g.done&&g.done(...e))},[n(f,{size:22,name:"play"}),X],8,["disabled"])])]),n("div",q,[n(f,{size:36,name:"upload"}),Y])],2),K],34)};const Q={inject:["$player","$app"],data:()=>({selecting:!1}),computed:{parsedContent(){const e=this.$player.activeCues.map((e=>e.text)).join("\n");return/\w/g.test(e)?e.replace(/<[^>]+>/g,"").split("\n").map((e=>e.split(" ").map((e=>`<span>${e}</span>`)).join(""))).join("\n"):""}},methods:{onPointerDown(e){this.selecting=!0,this.firstSelectedWord=e.target,e.target.classList.add("hover"),window.addEventListener("pointerup",this.onPointerUp,!0),window.addEventListener("pointermove",this.onPointerMove,!0),this.$player.lockCues()},onPointerMove(e){if(!this.selecting)return;const t=[...this.$refs.content.children];if(!t.includes(e.target))return;let i=!1,n=this.firstSelectedWord,s=e.target;if(t.indexOf(n)>t.indexOf(s)){const e=n;n=s,s=e}t.forEach((e=>{e===n&&(i=!0),e.classList[i?"add":"remove"]("hover"),e===s&&(i=!1)}))},onPointerUp(e){const{content:t}=this.$refs;window.removeEventListener("pointerup",this.onPointerUp,!0),window.removeEventListener("pointermove",this.onPointerMove,!0);let i="";[...t.children].forEach((e=>{e.classList.contains("hover")&&(i+=`${e.innerText} `,e.classList.remove("hover"))})),i&&(e.target===t||t.contains(e.target))&&this.translate(i.trim()),this.selecting=!1},translate(e){let t;t="google"===this.$app.translatorService?`https://translate.google.com/?op=translate&sl=${this.$app.subtitleLang}&tl=${this.$app.primaryLang}&text=${encodeURI(e)}`:`https://bing.com/translator?from=${this.$app.subtitleLang}&to=${this.$app.primaryLang}&text=${e.split(" ").join("+")}`,window.translatorTab&&!window.translatorTab.closed||(window.translatorTab=window.open("","Translate","width=480,height=600,menubar=off,location=off,resizable=off,scrollbars=off,status=off")),window.translatorTab.location=t,window.translatorTab.focus()}},style:({className:e})=>[e("subtitle",{width:"100%",height:"auto",display:"flex",flexDirection:"column",alignItems:"center","&:empty, & *:empty":{display:"none"},"& > *":{whiteSpace:"pre-line",width:"auto",textShadow:"0px 0 3px #000",lineHeight:"2.5rem",fontSize:"1.8rem",fontWeight:"bold",textAlign:"center"},"& > .content":{background:"rgba(0, 0, 0, 0.5)",border:"solid 1px rgba(0, 0, 0, 0.1)",borderRadius:"8px",overflow:"hidden",padding:"8px",color:"#fff","& > span":{padding:"4px 8px",cursor:"pointer",textShadow:"0px 0 3px #000","&:hover, &.hover":{background:"rgba(0, 0, 0, 0.3)",color:"#fff",textDecoration:"underline"}}}})]};Q.render=function(i,s,o,r,l,c){return a((e(),t("div",{class:i.$style.subtitle},[n("div",{ref:"content",class:"content",onPointerdown:s[1]||(s[1]=(...e)=>c.onPointerDown&&c.onPointerDown(...e)),innerHTML:c.parsedContent},null,40,["innerHTML"])],2)),[[d,c.parsedContent]])};const Z={inject:["$player"],computed:{progressStyle(){return{transform:`translateX(${-1*(100-this.$player.currentTime/this.$player.duration*100)}%)`}}},methods:{onPointerUp(e){if(this.disabled)return;const t=e.x/this.$refs.seek.offsetWidth*this.$player.duration;this.$player.setCurrentTime(Number(t.toFixed(2)))}},style:({className:e})=>[e("seek",{height:"20px",width:"100%",cursor:"pointer",position:"relative","&:hover":{"& > .content":{height:"20px"}},"& > .content":{background:"#222",height:"4px",transition:"height 0.1s",left:0,width:"100%",position:"absolute",bottom:0,overflow:"hidden","& > .progress":{transform:"translateX(-100%)",background:"#ff0000",height:"100%",left:0,position:"absolute",width:"100%"}}})]},ee={class:"content"};Z.render=function(i,s,o,a,r,l){return e(),t("div",{ref:"seek",class:i.$style.seek,onPointerup:s[1]||(s[1]=(...e)=>l.onPointerUp&&l.onPointerUp(...e))},[n("div",ee,[n("div",{class:"progress",style:l.progressStyle},null,4)])],34)};const te={components:{Seek:Z,Icon:v},inject:["$player"],computed:{formattedCurrentTime(){return Math.floor(this.$player.currentTime).toString().padStart(4,0)},formattedDuration(){return Math.floor(this.$player.duration).toString().padStart(4,0)}},watch:{"$player.currentTime"(e){if(this.$player.lockedCues.length){const t=Math.max(...this.$player.lockedCues.map((e=>e.startTime))),i=Math.min(...this.$player.lockedCues.map((e=>e.endTime)));e+1>=i&&setTimeout((()=>{this.$player.setCurrentTime(t)}),1e3*(i-e-.1))}}},methods:{nextCue(){const e=this.$player.allCues.find((e=>e.startTime>=this.$player.currentTime));e&&this.$player.setCurrentTime(e.startTime)},prevCue(){const e=this.$player.allCues.findIndex((e=>e.startTime>=this.$player.currentTime));e>0&&this.$player.allCues[e-2]&&this.$player.setCurrentTime(this.$player.allCues[e-2].startTime)},toggleLock(){this.$player.lockedCues.length?this.$player.unlockCues():this.$player.lockCues()}},style:({className:e})=>[e("controls",{width:"100%",height:"auto",display:"flex",flexDirection:"column",alignItems:"center",color:"#fff",fill:"#fff","& > .buttons":{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center","& > .line":{width:"2px",height:"30px",background:"#333",margin:"0 6px"},"& > button":{margin:"0 4px",cursor:"pointer",padding:"8px",background:"rgba(0, 0, 0, 0.5)",textShadow:"0px 0 3px #000",border:"solid 1px rgba(0, 0, 0, 0.1)",borderRadius:"8px","&:not(:disabled):hover":{background:"rgba(0, 0, 0, 0.6)"},"&:disabled":{cursor:"not-allowed",opacity:.4},"&[actived], &:not(:disabled):active":{boxShadow:"inset 0px 2px 3px rgba(0, 0, 0, 0.8)"}}},"& > .progress":{display:"flex",flexDirection:"row",justifyContent:"center",marginTop:"20px",width:"100%","& > input":{flexGrow:1,background:"transparent",margin:"0 8px"}}}),e("icon",{marginBottom:"0 !important"})]},ie={class:"buttons"},ne=n("div",{class:"line"},null,-1),se={class:"progress"};te.render=function(s,o,r,l,c,p){const u=i("Icon"),m=i("Seek");return e(),t("div",{class:s.$style.controls},[n("div",ie,[n("button",{disabled:!!p.$player.lockedCues.length,onClick:o[1]||(o[1]=(...e)=>p.prevCue&&p.prevCue(...e))},[n(u,{class:s.$style.icon,size:42,name:"arrow-left"},null,8,["class"])],8,["disabled"]),n("button",{onClick:o[2]||(o[2]=(...e)=>p.$player.togglePlay&&p.$player.togglePlay(...e))},[a(n(u,{class:s.$style.icon,size:42,name:"play"},null,8,["class"]),[[d,p.$player.isPaused]]),a(n(u,{class:s.$style.icon,size:42,name:"pause"},null,8,["class"]),[[d,!p.$player.isPaused]])]),n("button",{disabled:!p.$player.activeCues.length,actived:!!p.$player.lockedCues.length||null,onClick:o[3]||(o[3]=(...e)=>p.toggleLock&&p.toggleLock(...e))},[n(u,{class:s.$style.icon,size:42,name:"lock-reset"},null,8,["class"])],8,["disabled","actived"]),n("button",{disabled:!!p.$player.lockedCues.length,onClick:o[4]||(o[4]=(...e)=>p.nextCue&&p.nextCue(...e))},[n(u,{class:s.$style.icon,size:42,name:"arrow-right"},null,8,["class"])],8,["disabled"]),ne,n("button",{onClick:o[5]||(o[5]=(...e)=>p.$player.stop&&p.$player.stop(...e))},[n(u,{class:s.$style.icon,size:42,name:"close"},null,8,["class"])])]),n("div",se,[n(m)])],2)};const oe={components:{Subtitle:Q,Controls:te},provide(){return{$player:this}},inject:["$app"],emits:["stop"],data:()=>({allCues:[],activeCues:[],lockedCues:[],isPaused:!1,duration:0,currentTime:0}),computed:{movieSrc(){return URL.createObjectURL(this.$app.movie)},subtitleSrc(){return URL.createObjectURL(this.$app.subtitle)}},mounted(){this.play();const e=window[`${this.$app.movie.name}`];"number"==typeof e&&this.$nextTick((()=>{this.setCurrentTime(e)}))},methods:{onSubtitleTrackLoad(e){this.allCues=Object.freeze([...e.target.track.cues])},onCueChange(e){const t=Object.freeze([...e.target.track.activeCues]);this.activeCues=t},onPlayerStateUpdate(){const{player:e}=this.$refs;e&&(this.isPaused=e.paused,this.currentTime=e.currentTime,this.duration=e.duration,window[`${this.$app.movie.name}`]=e.currentTime)},stop(){this.$emit("stop")},play(){const{player:e}=this.$refs;return!!e.paused&&(e.play(),!0)},pause(){const{player:e}=this.$refs;return!e.paused&&(e.pause(),!0)},togglePlay(){this.play()||this.pause()},setCurrentTime(e){this.$refs.player.currentTime=e},lockCues(){this.lockedCues=this.activeCues},unlockCues(){this.lockedCues=[]}},style:({className:e})=>[e("player",{width:"100%",height:"100%",maxHeight:"100%",background:"#000","&::cue":{opacity:0}}),e("subtitle",{position:"absolute",bottom:"120px"}),e("controls",{position:"absolute",bottom:0})]};oe.render=function(s,o,a,r,l,c){const d=i("Subtitle"),p=i("Controls");return e(),t("div",null,[n("video",{ref:"player",class:s.$style.player,onPlay:o[3]||(o[3]=(...e)=>c.onPlayerStateUpdate&&c.onPlayerStateUpdate(...e)),onPause:o[4]||(o[4]=(...e)=>c.onPlayerStateUpdate&&c.onPlayerStateUpdate(...e)),onTimeupdate:o[5]||(o[5]=(...e)=>c.onPlayerStateUpdate&&c.onPlayerStateUpdate(...e))},[n("source",{src:c.movieSrc,type:"video/mp4"},null,8,["src"]),n("track",{ref:"subtitleTrack",kind:"subtitles",label:"Subtitle",default:"",src:c.subtitleSrc,onLoad:o[1]||(o[1]=(...e)=>c.onSubtitleTrackLoad&&c.onSubtitleTrackLoad(...e)),onCuechange:o[2]||(o[2]=(...e)=>c.onCueChange&&c.onCueChange(...e))},null,40,["src"])],34),n(d,{class:s.$style.subtitle},null,8,["class"]),n(p,{class:s.$style.controls},null,8,["class"])])};const ae=e=>{try{return JSON.parse(localStorage.getItem(`config:${e}`))}catch{return null}},re={components:{Config:y,Player:oe},provide(){return{$app:this}},data:()=>({movie:void 0,subtitle:void 0,subtitleLang:ae("subtitleLang")||"en",primaryLang:ae("primaryLang")||"fa",translatorService:ae("translatorService")||"google",isPlaying:!1}),watch:{subtitleLang(e){localStorage.setItem("config:subtitleLang",JSON.stringify(e))},primaryLang(e){localStorage.setItem("config:primaryLang",JSON.stringify(e))},translatorService(e){localStorage.setItem("config:translatorService",JSON.stringify(e))}},methods:{setSubtitleConfigProp(e,t){["subtitleLang","primaryLang","translatorService"].includes(e)&&(localStorage.setItem(`subtitle-config:${e}`,JSON.stringify(t)),this[e]=t)}},style:({className:e})=>[e("home",{width:"100%",height:"100%",maxHeight:"100%"})]};re.render=function(s,o,r,l,c,m){const h=i("Config"),g=i("Player");return e(),t(u,null,[a(n(h,{class:s.$style.home,onDone:o[1]||(o[1]=e=>c.isPlaying=!0)},null,8,["class"]),[[d,!c.isPlaying]]),c.isPlaying?(e(),t(g,{key:0,class:s.$style.home,onStop:o[2]||(o[2]=e=>c.isPlaying=!1)},null,8,["class"])):p("",!0)],64)};const le={components:{Home:re},style:({className:e,custom:t})=>[e("app",{width:"100%",height:"100%",overflow:"hidden"}),t("html, body, #app",{fontFamily:"sans-serif",width:"100%",height:"100%",minHeight:"100%",maxWidth:"100%"}),t("*, *:after, &:before",{bixSizing:"content-box",touchAction:"none !important"}),t("*",{touchAction:"none !important",userSelect:"none",fontFamily:"inherit",padding:0,margin:0,listStyle:"none",borderStyle:"solid",borderWidth:"0px",verticalAlign:"baseline",backfaceVisibility:"hidden",color:"inherit",borderColor:"inherit",backgroundColor:"transparent",borderSpacing:0,font:"unset","-webkitOverflowScrolling":"touch","-webkitTapHighlightColor":"rgba(0, 0, 0, 0)",boxSizing:"border-box","&::-moz-focus-inner":{border:0},"&:focus":{outline:"none"}}),t("a, a:hover, a:visited",{textDecoration:"none"})]};le.render=function(s,o,a,r,l,d){const p=i("Home");return e(),t("div",{class:s.$style.app,onContextmenu:o[1]||(o[1]=c((()=>{}),["prevent"]))},[n(p)],34)},m(le).use(h).mount("#app");