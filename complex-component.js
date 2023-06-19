class TreeItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.isOpen = false;
    }

    connectedCallback() {
        this.render();
        this.addEventListener('click', this.toggleMenu.bind(this));
    }

    toggleMenu(event) {
        event.stopPropagation();
        if (this.childNodes.length > 1) {
            this.isOpen = !this.isOpen;
        }
        this.render();
    }

    // getIndent() {
    //     let indent = this.getAttribute('indent')
    //     indent = parseInt(indent) || 0
    //     indent += 20
    //     return indent
    // }

    getNestedTreeItems() {
        const treeItems = Array.from(this.children)
        return treeItems.map(elem => elem.outerHTML).join('')
        // return treeItems.map(elem => elem.outerHTML.replace("<tree-item>", `<tree-item indent=${this.getIndent()}>`)).join('')
    }

    getDetailsIcon() {
        if (this.isOpen) {
            return `'▼'`
        }
        return `'►'`
    }

    render() {
        const template = document.createElement('template');
        template.innerHTML = `
        <style>
            * {
                font-weight: ${this.isOpen ? 'bold' : 'normal'};;
                font-family: Roboto;
            }

            .submenu {
                display: ${this.isOpen ? 'block' : 'none'};
                padding-left: 20px;
            }

            .tree-item {
                background-color: #eee;
                cursor: ${this.childNodes.length > 1 ? 'pointer' : 'auto'};
            }

            summary {
                padding: 5px 0 5px 0;
            }

            summary:hover {
                background-color: Gainsboro;
            }

            details > summary {
                list-style-type: ${this.getDetailsIcon()};
            }

            div > .tree-item {
                padding: 5px 0 5px 0;
            }

            div.tree-item {
                padding: 5px 0 5px 0;
            }

            div.tree-item:hover {
                background-color: Gainsboro;
            }

        </style>
        ${this.childNodes.length > 1 ? 
        `
        <details class="tree-item" open>
            <summary>
                ${this.childNodes[0].textContent}
            </summary>
            <div class="submenu">
                ${this.getNestedTreeItems()}
            </div>
        </details>
        `
        : 
        ` 
        <div class="tree-item">
            <slot></slot>
        </div>
        ` 
        }
        `;
        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('tree-item', TreeItem);
