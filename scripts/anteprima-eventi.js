// osascript -l JavaScript anteprima-eventi.js <copertina.jpg> <#RRGGBB sfondo> <uscita.jpg>
ObjC.import('AppKit');
function run(argv){
  var src=argv[0],hex=argv[1].replace('#',''),out=argv[2],W=1200,H=630;
  var c=function(i){return parseInt(hex.substr(i,2),16)/255;};
  var rep=$.NSBitmapImageRep.alloc.initWithBitmapDataPlanesPixelsWidePixelsHighBitsPerSampleSamplesPerPixelHasAlphaIsPlanarColorSpaceNameBytesPerRowBitsPerPixel(null,W,H,8,4,true,false,$.NSDeviceRGBColorSpace,0,0);
  var ctx=$.NSGraphicsContext.graphicsContextWithBitmapImageRep(rep);
  $.NSGraphicsContext.saveGraphicsState;$.NSGraphicsContext.setCurrentContext(ctx);
  ctx.imageInterpolation=$.NSImageInterpolationHigh;
  $.NSColor.colorWithDeviceRedGreenBlueAlpha(c(0),c(2),c(4),1).setFill;$.NSRectFill($.NSMakeRect(0,0,W,H));
  var img=$.NSImage.alloc.initWithContentsOfFile(src),r=img.representations.objectAtIndex(0);
  var iw=r.pixelsWide,ih=r.pixelsHigh,h=H-70,w=Math.round(iw*h/ih),x=Math.round((W-w)/2),y=35;
  // ombra morbida
  var sh=$.NSShadow.alloc.init;sh.shadowBlurRadius=30;sh.shadowOffset=$.NSMakeSize(0,-12);sh.shadowColor=$.NSColor.colorWithDeviceRedGreenBlueAlpha(.18,.08,.14,.35);sh.set;
  img.drawInRectFromRectOperationFraction($.NSMakeRect(x,y,w,h),$.NSZeroRect,$.NSCompositingOperationSourceOver,1);
  $.NSGraphicsContext.restoreGraphicsState;
  var data=rep.representationUsingTypeProperties($.NSBitmapImageFileTypeJPEG,$({NSImageCompressionFactor:0.85}));
  data.writeToFileAtomically(out,true);
  return out;
}
