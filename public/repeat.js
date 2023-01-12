var repeat = {};

repeat.getZIndex = function(element)
{
    var index = 0;
    var parent = element.parentElement;

    while(parent.tagName != 'BODY' && parent && index < 100) 
    {
        index++;
        parent = parent.parentElement;
    }

    return index;
}

repeat.compareIndexedElements = function(a, b)
{
    return b.index - a.index;
}

repeat.initializeTexts = function()
{
    var elements = document.querySelectorAll('[repeat-text]');
    var indexedElements = [];

    for (const e of elements) 
    {
        indexedElements.push(
        {
            element: e,
            index: repeat.getZIndex(e)
        });
    }

    indexedElements.sort(repeat.compareIndexedElements);

    for (const indexedElement of indexedElements) 
    {
        let text = indexedElement.element.innerHTML;
        let repeat = indexedElement.element.getAttribute("repeat-text") - 1;
        indexedElement.element.removeAttribute("repeat-text");

        for (var i = 0; i < repeat; i++)
        {
            indexedElement.element.innerHTML += text;
        }
    }
}
repeat.initializeElements = function()
{
    var elements = document.querySelectorAll('[repeat-element]');
    var indexedElements = [];

    for (const e of elements) 
    {
        indexedElements.push(
        {
            element: e,
            index: repeat.getZIndex(e)
        });
    }

    indexedElements.sort(repeat.compareIndexedElements);

    for (const indexedElement of indexedElements) 
    {
        let repeat = indexedElement.element.getAttribute("repeat-element") - 1;
        if (repeat > 0)
        {
            indexedElement.element.removeAttribute("repeat-element");

            if (indexedElement.element.parentElement.childElementCount > 1)
            {
                for (var i = 0; i < repeat; i++)
                {
                    indexedElement.element.parentElement.insertBefore(indexedElement.element.cloneNode(true), indexedElement.element);
                }
            }
            else
            {
                for (var i = 0; i < repeat; i++)
                {
                    indexedElement.element.parentElement.appendChild(indexedElement.element.cloneNode(true));
                }
            }
        } 
        else if (repeat == -1)
        {
            indexedElement.element.parentElement.removeChild(indexedElement.element);
        }
    }
}

repeat.initialize = function()
{
    repeat.initializeTexts();
    repeat.initializeElements();
}

window.addEventListener("load", repeat.initialize);