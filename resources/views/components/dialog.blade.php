<div>
    <div x-data="GlobalSearchModalComponent">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, earum velit nihil deleniti corrupti
        obcaecati
        ducimus vitae explicabo, fugit facere cumque eaque dolor vero laborum libero voluptatibus doloremque quae
        aspernatur
        a voluptatum hic? Laborum, sint molestias consectetur in fuga est suscipit voluptatum, tempore excepturi
        nihil
     
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', () => {
        const targetSelector = '.fi-topbar';
        const observerConfig = {
            childList: true,
            subtree: true
        };
        const observerCallback = (mutationsList) => {
            mutationsList.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    Array.from(mutation.addedNodes)
                        .filter(node => node.nodeType === Node.ELEMENT_NODE)
                        .forEach(checkForTargetClass);
                }
            });
        };
        const observer = new MutationObserver(observerCallback);
        const targetElement = document.querySelector(targetSelector);
        if (targetElement) {
            observer.observe(targetElement, observerConfig);
        }

        function checkForTargetClass(node) {
            if (node.classList.contains('fi-global-search-field')) {
                node.addEventListener('click', () => {
                    console.log('clicked on fi-global-search-field element');
                    node.dispatchEvent(
                        new CustomEvent("global-search-input-clicked")
                    )
                    node.disabled = true;
                    // Remove the input from the DOM
                    node.remove();
                    // Dispatch an event or perform actions when clicked
                });
                return;
            }
            Array.from(node.children)
                .filter(child => child.nodeType === Node.ELEMENT_NODE)
                .forEach(checkForTargetClass);
        }
    });
</script>
