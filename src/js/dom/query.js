exports.$ = function(selector, root) {
    root = root || document;
    if (root.querySelectorAll) {
        return root.querySelectorAll(selector);
    }

}