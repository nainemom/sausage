import{o as e,c as t,r as i,a as s,b as n,t as a,w as o,d as r,v as l,e as u,F as c,f as d,g as p}from"./vendor.dbfc7d7c.js";let m;const g={},h=function(e,t){if(!t)return e();if(void 0===m){const e=document.createElement("link").relList;m=e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(t.map((e=>{if(e in g)return;g[e]=!0;const t=e.endsWith(".css"),i=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${i}`))return;const s=document.createElement("link");return s.rel=t?"stylesheet":m,t||(s.as="script",s.crossOrigin=""),s.href=e,document.head.appendChild(s),t?new Promise(((e,t)=>{s.addEventListener("load",e),s.addEventListener("error",t)})):void 0}))).then((()=>e()))};const b={props:{name:{type:String,default:"close"},size:{type:Number,default:32}},data:()=>({iconSrc:null,svgContent:null}),computed:{className(){return`mdi mdi-${this.name}`}},async mounted(){const{default:e}=await function(e){switch(e){case"../../assets/icons/account-voice.svg":return h((()=>import("./account-voice.ae9c407c.js")),void 0);case"../../assets/icons/arrow-left.svg":return h((()=>import("./arrow-left.5ef3e1f7.js")),void 0);case"../../assets/icons/arrow-right.svg":return h((()=>import("./arrow-right.6bb00c6e.js")),void 0);case"../../assets/icons/close.svg":return h((()=>import("./close.63838621.js")),void 0);case"../../assets/icons/folder-outline.svg":return h((()=>import("./folder-outline.36dcb512.js")),void 0);case"../../assets/icons/lock-reset.svg":return h((()=>import("./lock-reset.3493f433.js")),void 0);case"../../assets/icons/movie-outline.svg":return h((()=>import("./movie-outline.ca6ff2a9.js")),void 0);case"../../assets/icons/pause.svg":return h((()=>import("./pause.d43f36d0.js")),void 0);case"../../assets/icons/play.svg":return h((()=>import("./play.7bb78c33.js")),void 0);case"../../assets/icons/subtitles-outline.svg":return h((()=>import("./subtitles-outline.49cb54bf.js")),void 0);case"../../assets/icons/translate.svg":return h((()=>import("./translate.a475fc2f.js")),void 0);case"../../assets/icons/upload.svg":return h((()=>import("./upload.bbdd5cba.js")),void 0);case"../../assets/icons/web.svg":return h((()=>import("./web.cb0cde69.js")),void 0);default:return Promise.reject(new Error("Unknown variable dynamic import: "+e))}}(`../../assets/icons/${this.name}.svg`),t=await fetch(e),i=await t.text();this.$el.innerHTML=i},style({className:e}){const{size:t}=this;return[e("icon",{display:"inline-block",width:`${t}px`,height:`${t}px`,lineHeight:`${t}px`,verticalAlign:"middle",marginBottom:this.size/8+"px","& > svg":{width:"100%",height:"100%"}})]}};b.render=function(i,s,n,a,o,r){return e(),t("div",{class:i.$style.icon},null,2)};var f={emits:["update:subtitle","update:movie"],props:{subtitle:{type:File,default:null},movie:{type:File,default:null}},methods:{setFilesConfigProp(e,t){this.$emit(`update:${e}`,t)}}};const v=e=>{try{return JSON.parse(localStorage.getItem(`config:${e}`))}catch{return null}};var y={emits:["update:subtitleLang","update:primaryLang","update:translatorService"],props:{subtitleLang:{type:String,default:v("subtitleLang")},primaryLang:{type:String,default:v("primaryLang")},translatorService:{type:String,default:v("translatorService")}},methods:{setSubtitleConfigProp(e,t){localStorage.setItem(`config:${e}`,JSON.stringify(t)),this.$emit(`update:${e}`,t)}}};const x={components:{Icon:b},mixins:[f,y],props:{subtitle:{type:File,default:null},movie:{type:File,default:null},subtitleLang:{type:String,default:null},primaryLang:{type:String,default:null},translatorService:{type:String,default:null}},emits:["done"],data:()=>({files:Object.freeze([]),dragEnter:!1}),computed:{movieFile(){return this.files.find((e=>e.name.endsWith(".mp4")||e.name.endsWith(".mkv")))},subtitleFile(){const e=this.files.find((e=>e.name.endsWith(".srt")||e.name.endsWith(".vtt")));return e&&e.name.endsWith(".vtt")?e:this.files.find((e=>e.name.endsWith(".srt")))},miniFileNames(){const e=e=>e.length>19?`${e.substr(0,8)}...${e.substr(-8)}`:e;return{movie:this.movieFile?e(this.movieFile.name):null,subtitle:this.subtitleFile?e(this.subtitleFile.name):null}},isReadyToDone(){return this.movieFile&&this.subtitleFile}},watch:{movieFile(e){this.setFilesConfigProp("movie",e)},subtitleFile(e){this.setFilesConfigProp("subtitle",e)}},created(){this.primaryLang||this.setSubtitleConfigProp("primaryLang","fa"),this.subtitleLang||this.setSubtitleConfigProp("subtitleLang","en"),this.translatorService||this.setSubtitleConfigProp("translatorService","google")},methods:{openFileSelectorDialog(){this.$refs.file.click()},onFileSelect(e){this.addFiles([...e.target.files])},onDragEnter(){this.dragEnter=!0},onDragLeave(e){e.clientX||e.clientY||(this.dragEnter=!1)},onDrop(e){this.dragEnter=!1,this.addFiles([...e.dataTransfer.files])},async addFiles(e){const t=e.filter((e=>"text/vtt"===e.type)),i=e.filter((e=>["video/x-matroska","video/mp4"].includes(e.type))),s=e.filter((e=>"application/x-subrip"===e.type));t.push(...(await Promise.all(s.map((e=>(e=>new Promise(((t,i)=>{const s=new FileReader;s.readAsText(e),s.onloadend=e=>t(e.target.result),s.onerror=e=>i(e)})))(e))))).map(((e,t)=>((e,t)=>{const i=new Blob([`WEBVTT\n\n${t.split("\n").map((e=>e.match(/^\d+:\d+:\d+,\d+\s-->\s\d+:\d+:\d+,\d+/gm)?e.split(",").join("."):e)).join("\n")}`],{type:"text/vtt"});return new File([i],e,{type:"text/vtt"})})(s[t].name,e)))),this.files=Object.freeze([...t,...i,...this.files])},done(){this.isReadyToDone&&this.$emit("done")}},style:({className:e})=>[e("setupForm",{display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1rem",background:"#eee",'& input[type="file"]':{display:"none"},"& button, & input, & select":{border:"solid 1px #ccc",height:"36px",padding:"0 12px",lineHeight:"36px",appearance:"none"},"& button":{cursor:"pointer","&:not(:disabled):hover, &:not(:disabled):focus":{background:"rgba(0, 0, 0, 0.05)"},"&:not(:disabled):active":{background:"rgba(0, 0, 0, 0.1)"},"&:disabled":{cursor:"not-allowed",fill:"#888",color:"#888"}},"& select":{cursor:"pointer","&:not(:disabled):hover, &:not(:disabled):focus":{background:"rgba(0, 0, 0, 0.05)"}},"& input":{width:"76px"},"& > .form":{background:"#fff",border:"solid 1px #ccc",overflow:"hidden",minWidth:"360px",padding:"16px 0",position:"relative","&.drag-enter":{border:"dotted 2px #ccc","& > *:not(.drag-enter-text)":{visibility:"hidden"},"& > .drag-enter-text":{fontSize:"1.4rem",display:"block",width:"100%",textAlign:"center",position:"absolute",color:"#444",fill:"#444",top:"50%",left:"50%",transform:"translate(-50%, -50%)"}},"& > .drag-enter-text":{display:"none"},"& > .line":{height:"1px",background:"#ccc",marginBottom:"16px"},"& > .form-element":{display:"flex",flexDirection:"row",alignItems:"center",padding:"0 16px","&:not(.last)":{marginBottom:"16px"},"& > .title":{color:"#555",fill:"#555",flexGrow:1},"& > .content":{paddingLeft:"16px"}}}})]},C={class:"form-element"},S={class:"title"},T=n(" Video File: "),w={class:"content"},L={class:"form-element"},_={class:"title"},k=n(" Subtitle File: "),P={class:"content"},$={class:"form-element"},D={class:"title"},F=n(" Subtitle Language: "),E={class:"content"},I={class:"form-element"},j={class:"title"},z=n(" My Primary Language: "),A={class:"content"},O={class:"form-element"},R={class:"title"},N=n(" Translator Service: "),U={class:"content"},V=s("option",{value:"google"}," Google ",-1),M=s("option",{value:"bing"}," Bing ",-1),H=s("div",{class:"line"},null,-1),W={class:"form-element last"},B=s("div",{class:"title"},null,-1),G={class:"content"},X=n(" Play "),J={class:"drag-enter-text"},q=n(" Drop Files Here ");x.render=function(r,l,u,c,d,p){const m=i("Icon");return e(),t("div",{class:r.$style.setupForm,onDragover:l[8]||(l[8]=o((()=>{}),["prevent"])),onDragenter:l[9]||(l[9]=(...e)=>p.onDragEnter&&p.onDragEnter(...e)),onDragleave:l[10]||(l[10]=(...e)=>p.onDragLeave&&p.onDragLeave(...e)),onDrop:l[11]||(l[11]=o(((...e)=>p.onDrop&&p.onDrop(...e)),["prevent"]))},[s("div",{class:["form",[d.dragEnter&&"drag-enter"]]},[s("input",{ref:"file",type:"file",onInput:l[1]||(l[1]=(...e)=>p.onFileSelect&&p.onFileSelect(...e))},null,544),s("div",C,[s("div",S,[s(m,{size:22,name:"movie-outline"}),T]),s("div",w,[s("button",{onClick:l[2]||(l[2]=(...e)=>p.openFileSelectorDialog&&p.openFileSelectorDialog(...e))},[s(m,{size:22,name:"folder-outline"}),n(" "+a(p.movieFile?p.miniFileNames.movie:"Browse..."),1)])])]),s("div",L,[s("div",_,[s(m,{size:22,name:"subtitles-outline"}),k]),s("div",P,[s("button",{onClick:l[3]||(l[3]=(...e)=>p.openFileSelectorDialog&&p.openFileSelectorDialog(...e))},[s(m,{size:22,name:"folder-outline"}),n(" "+a(p.subtitleFile?p.miniFileNames.subtitle:"Browse..."),1)])])]),s("div",$,[s("div",D,[s(m,{size:22,name:"web"}),F]),s("div",E,[s("input",{value:u.subtitleLang,onInput:l[4]||(l[4]=e=>r.setSubtitleConfigProp("subtitleLang",e.target.value))},null,40,["value"])])]),s("div",I,[s("div",j,[s(m,{size:22,name:"account-voice"}),z]),s("div",A,[s("input",{value:u.primaryLang,onInput:l[5]||(l[5]=e=>r.setSubtitleConfigProp("primaryLang",e.target.value))},null,40,["value"])])]),s("div",O,[s("div",R,[s(m,{size:22,name:"translate"}),N]),s("div",U,[s("select",{value:u.translatorService,onInput:l[6]||(l[6]=e=>r.setSubtitleConfigProp("translatorService",e.target.value))},[V,M],40,["value"])])]),H,s("div",W,[B,s("div",G,[s("button",{disabled:!p.isReadyToDone,onClick:l[7]||(l[7]=(...e)=>p.done&&p.done(...e))},[s(m,{size:22,name:"play"}),X],8,["disabled"])])]),s("div",J,[s(m,{size:36,name:"upload"}),q])],2)],34)};const Y={mixins:[y],props:{activeCues:{type:Array,default:()=>[]}},emits:["select"],data:()=>({selectedText:"",translatorTab:null}),computed:{parsedContent(){const e=this.activeCues.map((e=>e.text)).join("\n");return/\w/g.test(e)?e.replace(/<[^>]+>/g,"").split("\n").map((e=>e.split(" ").map((e=>`<span>${e}</span>`)).join(" "))).join("\n"):""}},watch:{parsedContent(){this.selectedText=""}},methods:{onContextMenu(){const e=window.getSelection().toString().trim();this.selectedText=e,this.translate(this.selectedText),this.$emit("select",e)},translate(e){let t;t="google"===this.translatorService?`https://translate.google.com/?op=translate&sl=${this.subtitleLang}&tl=${this.primaryLang}&text=${encodeURI(e)}`:`https://bing.com/translator?from=${this.subtitleLang}&to=${this.primaryLang}&text=${e.split(" ").join("+")}`,window.translatorTab&&!window.translatorTab.closed||(window.translatorTab=window.open("","Translate","width=480,height=600,menubar=off,location=off,resizable=off,scrollbars=off,status=off")),window.translatorTab.location=t,window.translatorTab.focus()}},style:({className:e})=>[e("subtitle",{width:"100%",height:"auto",display:"flex",flexDirection:"column",alignItems:"center","&:empty, & *:empty":{display:"none"},"& > *":{whiteSpace:"pre-line",padding:"15px",width:"auto",textShadow:"0 1px #000",lineHeight:"2.5rem",fontSize:"1.8rem",fontWeight:"bold",textAlign:"center"},"& > .translated":{background:"rgba(0, 0, 0, 0.4)",color:"#3eff3d"},"& > .content":{background:"rgba(0, 0, 0, 0.4)",color:"#fff","&, & *":{userSelect:"text"},"& > div":{lineHeight:1.6}}})]};Y.render=function(i,n,a,u,c,d){return r((e(),t("div",{class:i.$style.subtitle,onContextmenu:n[1]||(n[1]=o(((...e)=>d.onContextMenu&&d.onContextMenu(...e)),["prevent"]))},[s("div",{class:"content",innerHTML:d.parsedContent},null,8,["innerHTML"])],34)),[[l,d.parsedContent]])};const K={props:{value:{type:Number,default:0},length:{type:Number,default:0},disabled:{type:Boolean}},emits:["input"],computed:{progressStyle(){return{transform:`translateX(${-1*(100-this.value/this.length*100)}%)`}}},methods:{onMouseUp(e){if(this.disabled)return;const t=e.x/e.currentTarget.offsetWidth*this.length;this.$emit("input",t)}},style:({className:e})=>[e("seek",{height:"20px",width:"100%",cursor:"pointer",position:"relative","&:hover":{"& > .content":{height:"20px"}},"& > .content":{background:"rgba(255, 255, 255, 0.1)",height:"4px",transition:"height 0.1s",left:0,width:"100%",position:"absolute",bottom:0,overflow:"hidden","& > .progress":{transform:"translateX(-100%)",background:"#ff0000",height:"100%",left:0,position:"absolute",boxShadow:"3px 0 2px #000",width:"100%"}}})]},Q={class:"content"};K.render=function(i,n,a,o,r,l){return e(),t("div",{class:i.$style.seek,onMouseup:n[1]||(n[1]=(...e)=>l.onMouseUp&&l.onMouseUp(...e))},[s("div",Q,[s("div",{class:"progress",style:l.progressStyle},null,4)])],34)};const Z={components:{Seek:K,Icon:b},props:{allCues:{type:Array,default:()=>[]},activeCues:{type:Array,default:()=>[]},isPaused:{type:Boolean},currentTime:{type:Number,default:0},duration:{type:Number,default:0}},emits:["togglePlay","updateTime","stop"],data:()=>({lockedCues:[]}),computed:{formattedCurrentTime(){return Math.floor(this.currentTime).toString().padStart(4,0)},formattedDuration(){return Math.floor(this.duration).toString().padStart(4,0)}},watch:{currentTime(e){if(this.lockedCues.length){const t=Math.max(...this.lockedCues.map((e=>e.startTime))),i=Math.min(...this.lockedCues.map((e=>e.endTime)));e+1>=i&&setTimeout((()=>{this.$emit("updateTime",t)}),1e3*(i-e-.1))}}},methods:{togglePlay(){this.$emit("togglePlay")},nextCue(){const e=this.allCues.find((e=>e.startTime>=this.currentTime));e&&this.$emit("updateTime",e.startTime)},prevCue(){const e=this.allCues.findIndex((e=>e.startTime>=this.currentTime));e>0&&this.allCues[e-2]&&this.$emit("updateTime",this.allCues[e-2].startTime)},toggleLock(){this.activeCues.length&&(this.lockedCues=this.lockedCues.length?[]:this.activeCues)},updateTime(e){this.$emit("updateTime",e)},stop(){this.$emit("stop")}},style:({className:e})=>[e("controls",{width:"100%",height:"auto",display:"flex",flexDirection:"column",alignItems:"center",color:"#fff",fill:"#fff","& > .buttons":{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center","& > .line":{width:"2px",height:"30px",background:"#333",margin:"0 6px"},"& > button":{margin:"0 4px",cursor:"pointer",padding:"8px","&:not(:disabled):hover":{background:"rgba(255, 255, 255, 0.1)"},"&:disabled":{cursor:"not-allowed",opacity:.4}}},"& > .progress":{display:"flex",flexDirection:"row",justifyContent:"center",marginTop:"20px",width:"100%","& > input":{flexGrow:1,background:"transparent",margin:"0 8px"}}})]},ee={class:"buttons"},te=s("div",{class:"line"},null,-1),ie={class:"progress"};Z.render=function(n,a,o,r,l,u){const c=i("Icon"),d=i("Seek");return e(),t("div",{class:n.$style.controls},[s("div",ee,[s("button",{disabled:!!l.lockedCues.length,onClick:a[1]||(a[1]=(...e)=>u.prevCue&&u.prevCue(...e))},[s(c,{size:42,name:"arrow-left"})],8,["disabled"]),s("button",{disabled:!!l.lockedCues.length,onClick:a[2]||(a[2]=(...e)=>u.togglePlay&&u.togglePlay(...e))},[s(c,{size:42,name:o.isPaused?"play":"pause"},null,8,["name"])],8,["disabled"]),s("button",{disabled:!o.activeCues.length,onClick:a[3]||(a[3]=(...e)=>u.toggleLock&&u.toggleLock(...e))},[s(c,{size:42,name:"lock-reset"})],8,["disabled"]),s("button",{disabled:!!l.lockedCues.length,onClick:a[4]||(a[4]=(...e)=>u.nextCue&&u.nextCue(...e))},[s(c,{size:42,name:"arrow-right"})],8,["disabled"]),te,s("button",{onClick:a[5]||(a[5]=(...e)=>u.stop&&u.stop(...e))},[s(c,{size:42,name:"close"})])]),s("div",ie,[s(d,{disabled:!!l.lockedCues.length,length:10*o.duration,value:10*o.currentTime,onInput:a[6]||(a[6]=e=>u.updateTime(e/10))},null,8,["disabled","length","value"])])],2)};const se={components:{Subtitle:Y,Controls:Z},mixins:[f,y],props:{currentTime:{type:Number,default:0}},emits:["stop","update:currentTime"],data:()=>({allCues:[],activeCues:[],isPaused:!1,duration:0,started:!1}),computed:{movieSrc(){return URL.createObjectURL(this.movie)},subtitleSrc(){return URL.createObjectURL(this.subtitle)}},mounted(){this.updateTime(this.currentTime),this.started=!0},methods:{onSubtitleTrackLoad(e){this.allCues=Object.freeze([...e.target.track.cues])},onCueChange(e){const t=Object.freeze([...e.target.track.activeCues]);this.activeCues=t},onTimeUpdate(e){this.started&&this.$emit("update:currentTime",e)},onPlay(){const{player:e}=this.$refs;this.duration=e.duration,this.isPaused=!1},onPause(){this.isPaused=!0},stop(){this.$emit("stop")},togglePlay(){const{player:e}=this.$refs;e.paused?e.play():e.pause()},updateTime(e){const{player:t}=this.$refs;t.currentTime=e}},style:({className:e})=>[e("player",{width:"100%",height:"100%",maxHeight:"100%",background:"#000","&::cue":{opacity:0}}),e("subtitle",{position:"absolute",bottom:"120px"}),e("controls",{position:"absolute",bottom:0})]};se.render=function(n,a,o,r,l,u){const c=i("Subtitle"),d=i("Controls");return e(),t("div",null,[s("video",{ref:"player",class:n.$style.player,autoplay:"",onPlay:a[3]||(a[3]=(...e)=>u.onPlay&&u.onPlay(...e)),onPause:a[4]||(a[4]=(...e)=>u.onPause&&u.onPause(...e)),onTimeupdate:a[5]||(a[5]=e=>u.onTimeUpdate(e.target.currentTime))},[s("source",{src:u.movieSrc,type:"video/mp4"},null,8,["src"]),s("track",{ref:"subtitleTrack",kind:"subtitles",label:"Subtitle",default:"",src:u.subtitleSrc,onLoad:a[1]||(a[1]=(...e)=>u.onSubtitleTrackLoad&&u.onSubtitleTrackLoad(...e)),onCuechange:a[2]||(a[2]=(...e)=>u.onCueChange&&u.onCueChange(...e))},null,40,["src"])],34),s(c,{class:n.$style.subtitle,"active-cues":l.activeCues,"subtitle-lang":n.subtitleLang,"primary-lang":n.primaryLang,"translator-service":n.translatorService},null,8,["class","active-cues","subtitle-lang","primary-lang","translator-service"]),s(d,{class:n.$style.controls,"all-cues":l.allCues,"active-cues":l.activeCues,"is-paused":l.isPaused,"current-time":o.currentTime,duration:l.duration,onTogglePlay:u.togglePlay,onUpdateTime:u.updateTime,onStop:u.stop},null,8,["class","all-cues","active-cues","is-paused","current-time","duration","onTogglePlay","onUpdateTime","onStop"])])};const ne={components:{Config:x,Player:se},data:()=>({movie:void 0,subtitle:void 0,subtitleLang:void 0,primaryLang:void 0,translatorService:void 0,isPlaying:!1,playerCurrentTime:0}),methods:{togglePlay(){this.isPlaying=!this.isPlaying}},style:({className:e})=>[e("home",{width:"100%",height:"100%",maxHeight:"100%"})]};ne.render=function(n,a,o,d,p,m){const g=i("Config"),h=i("Player");return e(),t(c,null,[r(s(g,{movie:p.movie,"onUpdate:movie":a[1]||(a[1]=e=>p.movie=e),subtitle:p.subtitle,"onUpdate:subtitle":a[2]||(a[2]=e=>p.subtitle=e),"subtitle-lang":p.subtitleLang,"onUpdate:subtitle-lang":a[3]||(a[3]=e=>p.subtitleLang=e),"primary-lang":p.primaryLang,"onUpdate:primary-lang":a[4]||(a[4]=e=>p.primaryLang=e),"translator-service":p.translatorService,"onUpdate:translator-service":a[5]||(a[5]=e=>p.translatorService=e),class:n.$style.home,onDone:m.togglePlay},null,8,["movie","subtitle","subtitle-lang","primary-lang","translator-service","class","onDone"]),[[l,!p.isPlaying]]),p.isPlaying?(e(),t(h,{key:0,"current-time":p.playerCurrentTime,"onUpdate:current-time":a[6]||(a[6]=e=>p.playerCurrentTime=e),class:n.$style.home,movie:p.movie,subtitle:p.subtitle,"subtitle-lang":p.subtitleLang,"primary-lang":p.primaryLang,"translator-service":p.translatorService,onStop:m.togglePlay},null,8,["current-time","class","movie","subtitle","subtitle-lang","primary-lang","translator-service","onStop"])):u("",!0)],64)};const ae={components:{Home:ne},style:({className:e,custom:t})=>[e("app",{width:"100%",height:"100%",overflow:"hidden"}),t("html, body, #app",{fontFamily:"sans-serif",width:"100%",height:"100%",minHeight:"100%",maxWidth:"100%"}),t("*, *:after, &:before",{bixSizing:"content-box",touchAction:"none !important"}),t("*",{touchAction:"none !important",userSelect:"none",fontFamily:"inherit",padding:0,margin:0,listStyle:"none",borderStyle:"solid",borderWidth:"0px",verticalAlign:"baseline",backfaceVisibility:"hidden",color:"inherit",borderColor:"inherit",backgroundColor:"transparent",borderSpacing:0,font:"unset","-webkitOverflowScrolling":"touch","-webkitTapHighlightColor":"rgba(0, 0, 0, 0)",boxSizing:"border-box","&::-moz-focus-inner":{border:0},"&:focus":{outline:"none"}}),t("a, a:hover, a:visited",{textDecoration:"none"})]};ae.render=function(n,a,o,r,l,u){const c=i("Home");return e(),t("div",{class:n.$style.app},[s(c)],2)},window.$app=d(ae).use(p).mount("#app");
