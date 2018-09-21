import fetch from 'node-fetch';
import converter from 'json-2-csv';
import fs from 'fs'
import {promisify} from 'util';
const writeFile = promisify(fs.writeFile);
/**
* Get story
* @returns {Story}
*/
async function get(req, res) {
    return res.download('./output.csv');
    // const response = await fetch(req.query.url)
    // const json = await response.json();
    // if(json && json.data && json.data.length > 0) {
    //    let csvData = await converter.json2csvPromisified(json.data)
    //    return csvData;
    // } else {
    //     res.json({success:false, errorMsg: 'unable to load data from URL'})
    // }   
    //console.log(json);
    //return json;
    // keystone.list('Story').model.findById(id).populate('slides')
    // .then((story) => {
    //     req.story = story;
    //     return next();
    // })
    // .catch(e => next(e));
}

async function post(req, res) {
    let csvData = req.body.csvData;
    if(csvData && csvData.length > 0) {
        const flattenCsvData = csvData.reduce((agg,x) => {
            agg = agg.concat(...x);
            return agg;
          }, [])

        let csvDataInCsv = await converter.json2csvPromisified(flattenCsvData)
        console.log(csvDataInCsv)
       await writeFile('./output.csv',csvDataInCsv)
       console.log('wrote output.csv');
       res.set('Content-Type', 'text/csv');
       res.download('./output.csv');
    } else {
        res.json({success:false, errorMsg: 'unable to load data from URL'})
    }   
}

export default { get, post };
