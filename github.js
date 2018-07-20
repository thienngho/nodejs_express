const request = require('request');
const fs = require('fs');

const GITHUB_TOKEN = ' 86b8b09692142d10e7275de524b289596c54fc30';
const filename = 'data.json';

function getData (url) {
    const options = {
        uri: url,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
            'Authorization': `token ${GITHUB_TOKEN}`
        }
    };

    return new Promise(function(resolve, reject) {
        request.get(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        })
    })
}

function writeFile(filename, res) {
    return new Promise(function(resolve, reject) {
        fs.writeFile(filename, JSON.stringify(res), error => {
            if(error) return console.log(error);
            return console.log('File created successfully!')
        });
    })
}

function appendFile(filename, res) {
    return new Promise(function(resolve, reject) {
        fs.appendFile(filename, JSON.stringify(res), error => {
            if(error) return console.log(error);
            return console.log('File created successfully!')
        });
    })
}

 function getUserFromFile(filename, username) {
    // try {
        return new Promise( (res, reason) =>{
        fs.readFile(filename, function(err, text) {
            if(err){
                console.log(err);
                reason(err);
                return;
            }
            // console.log(text)
            let jsonContent = JSON.parse(text.toString());
            console.log(typeof(jsonContent));
            jsonContent.forEach((item, index) => {
                let itemJson = JSON.parse(item);
                // console.log('login', itemJson);
                usernameFile = itemJson.login;
                console.log(usernameFile);
                if (username == usernameFile) {
                    res(itemJson);
                  
                }
            });
        });
    });
    // } catch (error) {
    //     console.error('There was an error: ' +error);
    //     return;
    // }
}

exports.getGithub = async function (username) {
    let obj = {}
    const userProfileURL = 'https://api.github.com/users/' + username;
    const stats = fs.statSync(filename)
    const fileSizeInBytes = stats.size
    
    const checkUser =  getUserFromFile('data.json', username).then(res => console.log('checkUser ',checkUser));
    if (fileSizeInBytes == 0) {
        const dataPromise = await getData(userProfileURL);

        Promise.all([dataPromise])
        .then(function(res) {
            writeFile('data.json', res);
        })
        .catch(function(err) {
            console.log('err', err);
        });
    }
    else if (checkUser) {
        const dataPromise = getData(userProfileURL);

        Promise.all([dataPromise])
        .then(function(res) {
            appendFile('data.json', res);
        })
        .catch(function(err) {
            console.log('err', err);
        });
    
    } else {
        console.log('User is existed');
        return;
    }

}
