const allBtn = document.querySelector('#all');
const copyBtn = document.querySelector('#copy');
const root = document.querySelector('#root');

allBtn.addEventListener('click', () => {
  console.log('全选');
  let selection = window.getSelection();
  let range = document.createRange();
  range.selectNodeContents(root);
  selection.removeAllRanges();
  selection.addRange(range);
});

copyBtn.addEventListener('click', () => {
  console.log('复制');
  document.execCommand('copy');
});

const arr = [];

const getBookmarks = (bookmarks = [], index = 2) => {
  return bookmarks?.map((item) => {
    if (item.children) {
      arr.push(`${index === 2 ? '' : '> '}${'#'.repeat(index)} ${item.title}`);
      return getBookmarks(item.children, index + 1);
    }
    arr.push(`- [${item.title}](${item.url})`);
    return item;
  });
};

chrome.bookmarks.getTree((bookmarkTreeNodes) => {
  // console.log(bookmarkTreeNodes);
  getBookmarks(bookmarkTreeNodes[0].children);
  let str = '<p># 书签</p>';
  arr.forEach((item) => {
    str = `${str}<p>${item}</p>`;
  });
  root.innerHTML = str;
});
