// osascript -l JavaScript scripts/jpeg.js <entrata.jpg> <uscita.jpg> <larghezza massima px, 0 = invariata> <qualità 0-1>
// Ridimensiona e salva un JPEG progressivo con la compressione indicata (usato da ottimizza-foto.sh)
ObjC.import('AppKit');
function run(a){
  var img=$.NSImage.alloc.initWithContentsOfFile(a[0]),r=img.representations.objectAtIndex(0);
  var w=r.pixelsWide,h=r.pixelsHigh,max=+a[2],k=(max&&w>max)?max/w:1;
  var W=Math.round(w*k),H=Math.round(h*k);
  var rep=$.NSBitmapImageRep.alloc.initWithBitmapDataPlanesPixelsWidePixelsHighBitsPerSampleSamplesPerPixelHasAlphaIsPlanarColorSpaceNameBytesPerRowBitsPerPixel(null,W,H,8,4,true,false,$.NSDeviceRGBColorSpace,0,0);
  var ctx=$.NSGraphicsContext.graphicsContextWithBitmapImageRep(rep);
  $.NSGraphicsContext.saveGraphicsState;$.NSGraphicsContext.setCurrentContext(ctx);
  ctx.imageInterpolation=$.NSImageInterpolationHigh;
  img.drawInRectFromRectOperationFraction($.NSMakeRect(0,0,W,H),$.NSZeroRect,$.NSCompositingOperationCopy,1);
  $.NSGraphicsContext.restoreGraphicsState;
  rep.representationUsingTypeProperties($.NSBitmapImageFileTypeJPEG,$({NSImageCompressionFactor:+a[3],NSImageProgressive:true})).writeToFileAtomically(a[1],true);
  return W+'x'+H;
}
