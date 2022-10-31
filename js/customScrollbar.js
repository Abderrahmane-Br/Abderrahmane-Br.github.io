const customScrollbar = function (el) {
    const parent = el.parentNode;
    const parentPos = getComputedStyle(parent).position;
    if (parentPos === "static")
        parent.style.position = "relative";

    const elProps = [
        { "scrollbar-width": 'none' },
        { "-ms-overflow-style": 'none' },
        { "overflow-y": 'scroll' }
    ];
    let elPos = offset(el);
    let styleTag = document.createElement('style');
    styleTag.innerHTML = '.hiddenScrollbar::-webkit-scrollbar { display: none;}';//adding browser support to hide the default scrollbar
    document.querySelector('head').appendChild(styleTag);
    el.classList.add('hiddenScrollbar');
    for (let prop of elProps) {
        el.style[Object.keys(prop)[0]] = Object.values(prop)[0];
    }
    //////////
    //////////Creating the scrollbar
    let scrollbar = document.createElement('div');
    let scrollThumb = document.createElement('div');
    let scrollbarStyle = `position: absolute; top: ${elPos.top + 1}px;`;
    let scrollThumbStyle = `position: absolute; top: 0px; left: 0px;`;
    scrollbar.classList.add('customScrollbar');
    scrollThumb.classList.add('customScrollThumb');
    scrollbar.style = scrollbarStyle;
    scrollbar.style.height = el.clientHeight - 1 + 'px';
    scrollThumb.style = scrollThumbStyle;
    let heightRatio;
    // scrollThumb.style.height = heightRatio + '%';
    /* 
    */
    //moving the scrollbar
    el.addEventListener('scroll', () => {
        // heightRatio = el.clientHeight * 100 / el.scrollHeight;
        // scrollThumb.style.height = heightRatio + '%';
        let scrollRatio = el.scrollTop * 100 / el.scrollHeight;
        scrollThumb.style.top = scrollRatio + '%';
    })
    scrollbar.appendChild(scrollThumb);
    // if (el.offsetHeight < el.scrollHeight) {
    //     el.style.position = "relative";
    //     parent.appendChild(scrollbar);
    //     isAppended = true;
    // }

    //// observing resizes to change scrollbar dimensions adequately
    const observer = new ResizeObserver(entries => {
        for (const entry of entries) {
            const isAppended = parent.querySelector(".customScrollbar");
            heightRatio = el.clientHeight * 100 / el.scrollHeight;
            scrollbar.style.height = el.clientHeight - 1 + 'px';
            if (el.offsetHeight < el.scrollHeight) {
                if (!isAppended) {
                    el.style.position = "relative";
                    parent.appendChild(scrollbar);
                    el.classList.add("scrollable");
                }
                parent.querySelector(".customScrollThumb").style.height = heightRatio + '%';
            }
            else if (isAppended) {
                parent.removeChild(isAppended);
                el.classList.remove("scrollable");
            }
        }

    })
    observer.observe(el);
}
function offset(el) {
    // var rect = el.getBoundingClientRect(),
    //     scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    //     scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    // return { top: rect.top + scrollTop, left: rect.left + scrollLeft }

    return { top: el.offsetTop, left: el.offsetLeft }
}


customScrollbar(document.querySelector("main"));