window.LTrim = (str) => {
    if(str == null) return str;
    return str.replace(/^\s+/g, '');
}

window.Parser = (toParse) => {
    if (typeof toParse === 'string') {
        toParse = toParse.split('\n');
        toParse = toParse.slice(1);
    }
    let parsed = [];
    let currentIndex = -1;
    let prevObjectItem = '';
    toParse.forEach(i => {
        if (window.LTrim(i).startsWith('index: ') || window.LTrim(i).startsWith('* index: ')) {
            parsed[++ currentIndex] = {};
            parsed[currentIndex]['index'] = window.LTrim(i.replace(/\*? ?index: /g, ''));
        }else if (i.startsWith('\t\t')) {
            let tempVar = i.replace('\t\t', '').split(' = ');
            if (tempVar[1] === undefined) {
                tempVar = tempVar[0].split(':')
                tempVar = [tempVar.shift(), tempVar.join(':')]
            }
            if (typeof parsed[currentIndex]['properties'] !== 'object') {
                parsed[currentIndex]['properties'] = {};
                parsed[currentIndex]['properties'][tempVar[0]] = tempVar[1].replace(/(^")|("$)/g, '');
            }else parsed[currentIndex]['properties'][tempVar[0]] = tempVar[1].replace(/(^")|("$)/g, '');
        }else if (i.startsWith('\t')) {
            if (i.includes(':')) {
                let tempVar = i.replace('\t', '').split(':');
                prevObjectItem = tempVar[0];
                parsed[currentIndex][tempVar[0]] = window.LTrim(tempVar.slice(1).join(':'));
            }else {
                parsed[currentIndex][prevObjectItem] += `, ${window.LTrim(i.replace('\t', ''))}`
            }
        }
    });
    return parsed;
}