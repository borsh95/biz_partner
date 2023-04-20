const fs = require('fs');
const path = require('path');
var async = require('async');

const templateItem = function (path, hrefs = {}) {
	let result = {
		path,
		...hrefs
	}
	return JSON.stringify(result);
}

const templateJson = function (string) {
	return `
        {
            "icons": [
                ${string}
            ]
        }
    `;
}

const getHref = function(pathFile) {
	pathFile = pathFile.replace(/\\/g, '\/');
	pathFile = pathFile.replace(/\/{0,}app\//, '');

	let index = pathFile.indexOf('kit');

	if (index !== -1) {
		return pathFile.slice(0, index) + 'sprite.svg#';
	} else {
		return pathFile;
	}
}

const getFiles = function (dirPath, exp, callback) {
    fs.readdir(dirPath, function (err, files) {
        if (err) return callback(err);

        var filePaths = [];
        async.eachSeries(files, function (fileName, eachCallback) {
            var filePath = path.join(dirPath, fileName);

            fs.stat(filePath, function (err, stat) {
                if (err) return eachCallback(err);

                if (stat.isDirectory()) {
                    getFiles(filePath, exp, function (err, subDirFiles) {
                        if (err) return eachCallback(err);

                        filePaths = filePaths.concat(subDirFiles);
                        eachCallback(null);
                    });

                } else {
					const re = RegExp(`\.${exp}$`);

                    if (stat.isFile() && re.test(filePath)) {
                        filePaths.push(filePath);
                    }

                    eachCallback(null);
                }
            });
        }, function (err) {
            callback(err, filePaths);
        });
    });
}

module.exports = function() {
	getFiles('app/assets/img/icons', 'svg', function(err, files) {
		let _files = files.filter(file => file.indexOf('sprite.svg') == -1);

		let items = _files.reverse().map(file => {
			let hrefs = {};
			let fileContent = fs.readFileSync(file, 'utf8');
			fileContent = fileContent.replace(/"/g, "'");
			fileContent = fileContent.replace(/\n/g, " ");
			fileContent = fileContent.replace(/\s{2,}/g, " ");
			const resultParse = path.parse(file);
			let href = getHref(file);
	
			if (href.endsWith('#')) {
				hrefs.hrefSprite = href + resultParse.name
			} else {
				hrefs.href = href
			}
	
			return templateItem(fileContent, hrefs);
		})
	
		fs.writeFile("app/data/front_icons.json", templateJson(items.join(',')), 'utf8', function (err) {
			console.log(err);
		});
	});
};