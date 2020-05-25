export const compile = e => {
    let str = e.target.value;
    let parser = document.querySelector('.parser');
    let beforeItalics = [];
    let afterItalics = [];
    let beforeBold = [];
    let afterBold = [];
    let concat = [];
    let arr = str.split('');

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '*') {
            let j = i + 1;
            let newItalicSet = [];
            while (arr[j] !== '*' && j <= arr.length) {
                newItalicSet.push(arr[j]);
                j++;
            }
            beforeItalics = arr.slice(0, i);
            afterItalics = arr.slice(j + 1);
            beforeItalics.push('<em>' + newItalicSet.join('') + '</em>');
            concat = beforeItalics.concat(afterItalics);
            arr = concat;
        }
        if (arr[i] === ':') {
            let j = i + 1;
            let newBoldSet = [];
            while (arr[j] !== ':' && j <= arr.length) {
                newBoldSet.push(arr[j]);
                j++;
            }
            beforeBold = arr.slice(0, i);
            afterBold = arr.slice(j + 1);
            beforeBold.push('<b>' + newBoldSet.join('') + '</b>');
            concat = beforeBold.concat(afterBold);
            arr = concat;
        }
    }

    parser.innerHTML = arr.join('');
    return parser.innerHTML;
};