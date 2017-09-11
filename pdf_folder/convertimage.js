/**
 * Created by sourabh on 22/6/17.
 */

const PDFConverter = require("pdf-image").PDFImage;
const fs = require("fs");
const async=require("async");
const pdfFile = new PDFConverter("/home/sourabh/Downloads/Dissertation Project Report MCA SOURABH_KHERA.pdf");

//pdfFile.setConvertExtension('jpeg');

let pageCount = 0;
// 1 way:-

//  convert=(count)=> {
//     pdfFile.convertPage(count)
//         .then((imagePath) => {
//                 fs.createReadStream(imagePath)
//                 .pipe(fs.createWriteStream('./pdf_image_folder/abc-'+pageCount+'.png'));
//             convert(++pageCount);
//         }).catch((error)=> {
//             console.log('Total Pages = ', pageCount);
//         });
// }
// convert(pageCount);

//2 way:-

// pdfFile.numberOfPages().then( (numberOfPages) => {
//    let pageNumber = numberOfPages;
//    return pageNumber;
// }).then((pageNumber)=>{
//     for (let i = 0; i < pageNumber; i++) {
//         pdfFile.convertPage(i)
//             .then((imagePath) => {
//                 fs.createReadStream(imagePath)
//                     .pipe(fs.createWriteStream('./pdf_image_folder/abc-' + i + '.jpg'));
//             }).catch( (error) => {
//             console.log(error);
//         });
//     }
// });

//3 way:-
async.waterfall([
    (callback)=>{
        pdfFile.numberOfPages().then((totalPages)=>{
            callback(null,totalPages)
        });
    },
    (totalPages,callback)=>{
        process.nextTick(
            async.times(totalPages, function (index, cb) {
                pdfFile.convertPage(index)
                    .then((imagePath) => {
                        fs.createReadStream(imagePath)
                            .pipe(fs.createWriteStream('./pdf_image_folder/abc-' + index + '.jpg'));
                        cb(null, imagePath);
                    }).catch(error=>{
                        console.log(error);
                });
            },function(err, filepaths){
                console.log("error:", err);
                callback(null,filepaths);
            })
        )
    },

], (err, result)=> {
    console.log(result);
});











