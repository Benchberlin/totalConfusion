var product=function(canvas,ctx,startImage,placementImage,topImage,cords,options,el_id){this.canvas=canvas;this.ctx=ctx;this.images=[];this.imagesString=false;this.showGrid=false;this.loaded=false;this.ready=false;this.preset=false;this.alwaysShowGrid=false;this.hideGuideTimer=false;this.isMouseOver=false;this.attempts=1;this.maxAttempts=5;this.insert(startImage,placementImage,topImage,cords,options,false,el_id);this.listerns();this.previousCords=false;this.cords=JSON.parse(cords);;this.current_cords=false;this.previousCords=JSON.parse(cords);this.defaultCords=false;this.preview_cords=false;this.edit=false;this.resize_x=false;this.resize_y=false;this.showConstantGrid=true;this.gridThinkness=4;this.pos={x:0,y:0,w:0,h:0,}
this.controls={active:false,resize:{step:1,start:0,current:0,steps:0,max:10,size_current:1,start_current:1,}}
if(typeof options.current_cords!="undefined")
{this.current_cords=options.current_cords.split(",");this.history_current_cords=options.current_cords.split(",");}
if(typeof options.default_cords!="undefined")
{this.defaultCords=options.default_cords.split(",");}
if(typeof options.preview_cords!="undefined")
{this.preview_cords=options.preview_cords.split(",");}
if(typeof options.edit!="undefined")
{this.edit=true;}
if(typeof options.resize_x!="undefined")
{this.resize_x=options.resize_x;this.resize_y=options.resize_y;}
if(typeof options.always_show_grid!='undefined')
{this.alwaysShowGrid=true;}
this.drawingPlacementElement=$('#drawing-placement');}
product.prototype.insert=function(startImage,placementImage,topImage,cords,options,keepLocation,el_id){var force=false;if(topImage&&!this.images[2])
{this.images[2]=topImage;}
else if(!topImage&&this.images[2])
{this.images=[];force=true;}
if(this.images[2]&&topImage!=this.images[2].src)
{this.images[2]=topImage;force=true;}
if(!this.imagesString||startImage!=this.imagesString||force)
{this.images[0]=startImage;this.images[1]=placementImage;this.imagesLoaded=false;this.loaded=false;this.imagesString=startImage;}
if(!cords)
{return;}
cords=JSON.parse(cords);this.cords=cords;if(!this.previousCords)
{this.previousCords=cords;}
this.sx=cords.x,this.sy=cords.y,this.sw=cords.w,this.sh=cords.h;if(!keepLocation)
{this.asx=0;this.asy=0;this.asw=0;this.ash=0;this.xx=0;this.yy=0;this.ww=0;this.hh=0;this.resize=1;}
this.el_id=el_id;this.isCrop=(options.use_crop==="1");this.toImage=(options.to_image==="1");this.isResizable=(options.resizeable==="1");this.showGrid=(options.show_grid==="1");this.moveable=(options.moveable==="1");this.mouseActive=false;this.constraints=(options.constraints==="1");if(options.fullsize==="1"||options.fullsize==1)
{this.isFullSize=true;}
this.preset=(options.preset==="1");this.color_code=options.color_code?options.color_code:'#FFFFFF';this.renderCtx=false;}
product.prototype.createPreCanvas=function(){if($('#render_canvas_pre').length==0)
{var renderCanvas=$('<canvas id="render_canvas_pre" class="hidden"></div>');$('body').append(renderCanvas);}}
product.prototype.start=function(callback){var _this=this;this.previousCords=this.cords;this.loadImages(function(){_this.imagesLoaded=true;_this.process();if(callback)
{callback();}});}
product.prototype.end=function(){if(this.toImage)
{this.createImageFromCanvas();}
this.previousCords=this.cords;}
product.prototype.createImageFromCanvas=function(){var dataURL=this.canvas.toDataURL();$('#'+this.el_id).parent().html('<img class="c-im-product" src="'+dataURL+'" width="100%" />');}
product.prototype.renew=function(callback){var _this=this;if(this.imagesLoaded)
{_this.process(true);if(callback)
{callback();}
return;}
this.loadImages(function(){_this.imagesLoaded=true;_this.process(true);if(callback)
{callback();}});}
product.prototype.reset=function(){this.resize=1;this.current_cords=this.history_current_cords;this.process();}
product.prototype.restore=function(){this.resize=1;this.current_cords=false;this.process();}
product.prototype.process=function(ignoreAllocation){if(!this.imagesLoaded)return;this.canvas.width=this.images[0].width;this.canvas.height=this.images[0].height;this.ready=true;if(this.isCrop)
{this.createPreCanvas();}
if(this.images[0].width<600)
{this.gridThinkness=2;}
if(!ignoreAllocation||!this.loaded||this.preset)
{this.allocate();}
else
{if(JSON.stringify(this.cords)!==JSON.stringify(this.previousCords))
{this.setCords();this.resetAllocate();}
this.draw();}
this.end();}
product.prototype.setCords=function(){var x=this.sx*this.images[0].width;var y=this.sy*this.images[0].height;var w=this.sw*this.images[0].width;var h=this.sh*this.images[0].height;this.asx=x;this.asy=y;this.asw=w;this.ash=h;}
product.prototype.resetAllocate=function(){this.allocate();this.resize=1;}
product.prototype.getHeight=function(h,image_height){return h*image_height;}
product.prototype.getWidth=function(w,image_width){return w*image_width;}
product.prototype.allocate=function(){var p=this.images[1];this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);var x=this.sx*this.images[0].width;var y=this.sy*this.images[0].height;var w=this.getHeight(this.sw,this.images[0].width);var h=this.getHeight(this.sh,this.images[0].height);this.asx=x;this.asy=y;this.asw=w;this.ash=h;var w_ratio=w/p.width;var h_ratio=h/p.height;var nw=w;var nh=h;if(w_ratio>h_ratio)
{nw=h_ratio*p.width
x+=(w/2)-(nw/2);}
else
{nh=w_ratio*p.height;y+=(h/2)-(nh/2);}
if(this.isFullSize)
{if(p.height>p.width)
{if(this.sw>this.sh||w_ratio>h_ratio)
{nw=this.asw;nh=w_ratio*p.height;x=this.asx;y+=(h/2)-(nh/2);}
else
{nh=this.ash;nw=h_ratio*p.width;y=this.asy;x+=(w/2)-(nw/2);}}
else if(p.width>p.height)
{if(this.sw>this.sh&&w_ratio>h_ratio)
{nw=this.asw;nh=w_ratio*p.height;x=this.asx;y+=(h/2)-(nh/2);}
else
{nh=this.ash;nw=h_ratio*p.width;y=this.asy;x+=(w/2)-(nw/2);}}
else
{if(this.sw>this.sh)
{nw=this.asw;nh=w_ratio*p.height;x=this.asx;y+=(h/2)-(nh/2);}
else
{nh=this.ash;nw=h_ratio*p.width;y=this.asy;x+=(w/2)-(nw/2);}}}
this.xx=x;this.yy=y;this.ww=nw;this.hh=nh;this.fw=nw;this.fh=nh;this.startMouse={x:x,y:y};this.moveMouse={x:x,y:y};if(this.current_cords)
{this.currentCords(this.current_cords);}
else
{this.draw();}}
product.prototype.currentCords=function(cords){var p=this.images[1];if(!this.edit)
{var ww=this.defaultCords[2]*this.images[0].width;var hh=this.defaultCords[3]*this.images[0].height;var aw=parseFloat(ww)-parseFloat(this.asw);var ah=parseFloat(hh)-parseFloat(this.ash);this.ww=cords[0]*(this.asw+aw);this.hh=cords[1]*(this.ash+ah);}
else
{this.ww=cords[0]*this.asw;this.hh=cords[1]*this.ash;}
this.xx=parseFloat(cords[2])+parseFloat(this.asx);this.yy=parseFloat(cords[3])+parseFloat(this.asy);this.current_cords;this.draw();}
product.prototype.setCordsValue=function(x,y)
{var pw,ph;var tt=0,ll=0;var aw=0,ah=0;var width=(this.ww/this.asw).toFixed(2);var height=(this.hh/this.ash).toFixed(2);var left=((x-this.asx)).toFixed(2);var top=((y-this.asy)).toFixed(2);var ww=this.asw.toFixed(2);var hh=this.ash.toFixed(2);var cords=width+','+height+','+left+','+top+','+ww+','+hh;if(this.drawingPlacementElement)
{this.drawingPlacementElement.val(cords);$('.placement-cords').val(cords);}
if(this.preview_cords)
{pw=this.preview_cords[2]*this.images[0].width;ph=this.preview_cords[3]*this.images[0].height;aw=parseFloat(pw)-parseFloat(this.asw);ah=parseFloat(ph)-parseFloat(this.ash);ll=aw/2;tt=ah/2;var width=(this.ww/(this.asw+aw)).toFixed(2);var height=(this.hh/(this.ash+ah)).toFixed(2);var left=((x-(this.asx-ll))).toFixed(2);var top=((y-(this.asy-tt))).toFixed(2);var ww=(this.asw+aw).toFixed(2);var hh=(this.ash+ah).toFixed(2);var cords=width+','+height+','+left+','+top+','+ww+','+hh;$('#preview-placement').val(cords);}
else
{if($('#preview-placement').length>=1)
{$('#preview-placement').val(cords);}}}
product.prototype.draw=function(x,y){var b=this.images[0];var p=this.images[1];var t=this.images[2];var _this=this;x=x?x:this.xx;y=y?y:this.yy;this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);this.ctx.fillStyle=this.color_code;this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);if(typeof b!='object'||typeof p!='object')
{if(this.attempts>=this.maxAttempts)
{return;}
return setTimeout(function(){_this.attempts++;_this.reset();},500);}
this.ctx.drawImage(b,0,0,b.width,b.height,0,0,b.width,b.height);this.pixelate(false);this.ctx.globalAlpha=1;if(this.isCrop)
{this.crop(p,x,y);}
else
{this.ctx.drawImage(p,0,0,p.width,p.height,x,y,this.ww,this.hh);}
this.pos={x:x,y:y,w:this.ww,h:this.hh,}
this.setCordsValue(x,y);this.ctx.globalAlpha=0.1;this.ctx.drawImage(b,0,0,b.width,b.height,0,0,b.width,b.height);this.pixelate(true);this.ctx.globalAlpha=1;if(t)
{this.ctx.drawImage(this.images[2],0,0,t.width,t.height,0,0,t.width,t.height);}
if(!this.isCrop&&this.mouseActive)
{this.showGuide(x,y);}
this.showControls();if(this.alwaysShowGrid&&this.showConstantGrid)
{this.showConstGrid();}}
product.prototype.showControls=function(){if(!$('.canvas-control-buttons').length||this.controls.active||!this.isMouseOver)
{return this.hideControls();}
$('.canvas-control-buttons').show();var btn_size=$('.canvas-size').width();var dif=$(".render_shop_canvas").width()/this.canvas.width;this.controls.resize.step=dif;var x_w=(this.pos.x+this.pos.w);var y_h=(this.pos.y+this.pos.h);var size_x=x_w-(btn_size/2);var size_y=y_h-(btn_size/2);$('.canvas-size').css({left:size_x*dif,top:size_y*dif});}
product.prototype.hideControls=function(){$('.canvas-control-buttons').hide();}
product.prototype.snapGrid=function(x,y){var snap_g=5;}
product.prototype.showGuide=function(x,y,ctx){ctx=ctx?ctx:this.ctx;x=x?x:this.xx;y=y?y:this.yy;ctx.lineWidth=this.gridThinkness;ctx.setLineDash([8,5]);ctx.strokeStyle="#4affff";ctx.strokeRect(x,y,this.ww,this.hh);this.showConstGrid(ctx);}
product.prototype.keepGridActive=function(){if(!this.ready)
{return;}
this.draw();this.showGuide();this.showControls();}
product.prototype.showConstGrid=function(ctx){ctx=ctx?ctx:this.ctx;ctx.lineWidth=this.gridThinkness+2;ctx.setLineDash([8,5]);ctx.strokeStyle="#000000";ctx.strokeRect(this.asx,this.asy,this.asw,this.ash);ctx.lineWidth=this.gridThinkness;ctx.setLineDash([8,5]);ctx.strokeStyle="#FFFFFF";ctx.strokeRect(this.asx,this.asy,this.asw,this.ash);}
product.prototype.hideGuide=function(){if(!this.ready)
{return;}
this.draw();}
product.prototype.crop=function(p,x,y){var left=this.asx;var top=this.asy;var width=this.asw+this.asx;var height=this.ash+this.asy;if(!this.renderCtx)
{this.renderCanvas=document.getElementById('render_canvas_pre');this.renderCtx=this.renderCanvas.getContext("2d");}
this.renderCanvas.width=this.canvas.width;this.renderCanvas.height=this.canvas.height;this.renderCtx.clearRect(0,0,this.renderCanvas.width,this.renderCanvas.height);this.renderCtx.drawImage(p,0,0,p.width,p.height,x,y,this.ww,this.hh);this.renderCtx.clearRect(0,0,left,2000);this.renderCtx.clearRect(0,0,2000,top);this.renderCtx.clearRect(width,0,2000,2000);this.renderCtx.clearRect(0,height,2000,2000);if(this.showGrid&&this.mouseActive)
{this.showGuide(x,y,this.renderCtx);}
this.ctx.drawImage(this.renderCanvas,0,0);}
product.prototype.pixelate=function(status){this.ctx.imageSmoothingEnabled=status;this.ctx.imageSmoothingEnabled=status;this.ctx.webkitImageSmoothingEnabled=status;this.ctx.msImageSmoothingEnabled=status;}
product.prototype.loadImages=function(callback){var _this=this;var imagesLoaded=[];for(i=0;i<this.images.length;i++){var img=new Image;img.crossOrigin="Anonymous";img.sx=i;img.onload=function(){_this.images[this.sx]=this;imagesLoaded.push(this.sx);if(imagesLoaded.length==_this.images.length)
{return callback();}}
if(typeof this.images[i]=='string')
{img.src=this.images[i];}
else
{img.src=this.images[i].src;}}}
product.prototype.listerns=function(){var _this=this;if(!this.moveable)return false;if($(window).width()<=1024)
{$('#'+this.canvas.id).bind('touchstart',function(e){_this.disableScrolling();_this.mouseDown(e,true);});$(document).on("touchstart",function(e){var t=e.target;if(t.classList[0]!='render_shop_canvas')
{_this.enableScrolling();}});$(document).on("touchend",function(){_this.enableScrolling();_this.mouseUp();});$(document).on("touchmove",function(e){_this.move(e,false,true);});}
else
{$('#'+this.canvas.id).bind('pointerdown',function(e){_this.mouseDown(e);});$(document).on("pointerup",function(){_this.mouseUp();});$(document).on("pointermove",function(e){_this.move(e);});$('.product-image-render').mousemove(function(e){_this.isMouseOver=true;if(!_this.mouseActive)
{_this.keepGridActive();}});$('.product-image-render').mouseleave(function(e){_this.isMouseOver=false;_this.hideGuide();_this.hideControls();});$('.canvas-size').on('mousedown',function(e){_this.controls.active=true;_this.doResize();});$(document).mouseup(function(e){_this.controls.resize.start=false;_this.controls.active=false;});}
$('.move_drawing').on('mousedown',function(e){var d=$(this).attr('data-direction');_this.touch();_this.arrow(e,e.which,d);_this.autoHideGuide();});$('.reset-image').click(function(e){_this.touch();_this.reset()});$('.const-grid-toggle').click(function(e){_this.showConstantGrid=!_this.showConstantGrid;$('.const-grid-toggle').find('input').prop('checked',_this.showConstantGrid);_this.draw();});$('#restore').click(function(e){_this.touch();_this.restore()});$('#size_up').click(function(e){_this.touch();_this.resize+=.1;_this.doSize('up');_this.showGuide();_this.autoHideGuide();});$('#size_down').click(function(e){_this.touch();_this.resize-=.1;_this.doSize('down');_this.showGuide();_this.autoHideGuide();});if($('.moveable-option-container').length>=1||$('.image-preview-container-shop').length>=1)
{$(document).keydown(function(e){_this.touch();_this.arrow(e,e.which);});$(document).keyup(function(e){clearTimeout(_this.hideGuideTimer);_this.hideGuideTimer=setTimeout(function(){_this.hideGuide()},1000);});}}
product.prototype.clearAutoHideGuide=function(){clearTimeout(this.hideGuideTimer);this.hideGuideTimer=false;}
product.prototype.autoHideGuide=function(){var _this=this;this.clearAutoHideGuide();this.hideGuideTimer=setTimeout(function(){_this.hideGuide();_this.mouseUp();},1000);}
product.prototype.disableScrolling=function(){$('body').css({overflow:'hidden',height:'100%'});}
product.prototype.enableScrolling=function(){$('body').css({overflow:'auto',height:'auto'});}
product.prototype.arrow=function(e,direction,mobile_d){var a=1;if(mobile_d)
{a=5;switch(mobile_d)
{case('left'):direction=37;break;case('right'):direction=39;break;case('up'):direction=38;break;case('down'):direction=40;break;}}
switch(direction)
{case(39):this.xx+=a;e.preventDefault();break;case(37):this.xx-=a;e.preventDefault();break;case(38):this.yy-=a;e.preventDefault();break;case(40):this.yy+=a;e.preventDefault();break;}
this.draw();this.showGuide();}
product.prototype.doSize=function(type){var ww=this.ww;var hh=this.hh;this.ww=this.fw*this.resize;this.hh=this.fh*this.resize;this.draw();}
product.prototype.doResize=function(x,y){if(typeof x!='number')
{return;}
var o=(Math.abs(x)>Math.abs(y))?x:y;if(!this.controls.resize.start)
{this.controls.resize.start=o;this.controls.resize.start_current=this.resize;}
this.controls.resize.current=o;var lar=(this.controls.resize.start>this.controls.resize.current)?'neg':'pos'
var dif=(this.controls.resize.start-this.controls.resize.current)/this.controls.resize.step;var d=Math.abs(dif)*(this.controls.resize.step/500);this.resize=this.controls.resize.start_current;if(lar=='neg')
{this.resize-=d;}
else
{this.resize+=d;}
this.doSize();this.draw();}
product.prototype.mouseUp=function(){if(!this.mouseActive||!this.moveable)return;this.mouseActive=false;this.xx=this.moveMouse.x;this.yy=this.moveMouse.y;this.startMouse.x=this.xx;this.startMouse.y=this.yy;this.draw();}
product.prototype.mouseDown=function(e,mobile){if(this.mouseActive)
{return;}
if(this.hideGuideTimer)
{this.clearAutoHideGuide();}
this.mouseActive=true;var pos=getMousePos(this.canvas,e,mobile);this.startMouse.x=pos.x;this.startMouse.y=pos.y;}
product.prototype.move=function(e,force,mobile){if(!this.mouseActive&&!this.controls.active||!this.moveable&&!this.controls.active)return;var pos=getMousePos(this.canvas,e,mobile);var dx=this.startMouse.x-pos.x;var dy=this.startMouse.y-pos.y;var xx=this.xx-dx;var yy=this.yy-dy;if(this.constraints)
{if(xx<this.asx)xx=this.asx;if(yy<this.asy)yy=this.asy;if((xx+this.ww)>(this.asx+this.asw))xx=((this.asx+this.asw)-this.ww);if((yy+this.hh)>(this.asy+this.ash))yy=((this.asy+this.ash)-this.hh);}
this.moveMouse.x=xx;this.moveMouse.y=yy;if(this.controls.active)
{this.doResize(pos.x,pos.y);return;}
this.touch();this.draw(xx,yy);}
product.prototype.touch=function(){$('.canvas_updated').val('1');}
function getMousePos(canvas,evt,mobile){var x=mobile?evt.originalEvent.touches[0].clientX:evt.clientX;var y=mobile?evt.originalEvent.touches[0].clientY:evt.clientY;var rect=canvas.getBoundingClientRect();return{x:x-rect.left,y:y-rect.top};}