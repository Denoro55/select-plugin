function getTemplate(placeholder, data = [], selectedId) {
    let text = placeholder ?? 'Placeholder';

    const items = data.map(item => {
        let cls = 'select__item';
        if (selectedId === item.id) {
            text = item.value;
            cls = 'select__item selected';
        }

        return `<div class="${cls}" data-id="${item.id}" data-type="item">${item.value}</div>`
    });

    return `
        <div class="select__backdrop" data-type="backdrop"></div>
        <div class="select__label" data-type="label">
            <span data-type="value"> ${text} </span>
            <div class="select__icon">
                <i class="fa fa-angle-down" aria-hidden="true" data-type="arrow"></i>
            </div>
        </div>
        <div class="select__dropdown">
            <div class="select__list">
                ${items.join('')}
            </div>
        </div>
    `
}

class Select {
    constructor(el, options) {
        this.$el = document.querySelector(el);
        this.options = options;
        this.selectedId = options.selectedId;

        this.#render();
        this.#init();
    }

    #render() {
        const {placeholder, data} = this.options;

        this.$el.classList.add('select');
        this.$el.innerHTML = getTemplate(placeholder, data, this.selectedId);
    }

    #init() {
        this.clickHandler = this.clickHandler.bind(this);
        this.$el.addEventListener('click', this.clickHandler);
        this.$arrow = this.$el.querySelector('[data-type="arrow"]');
        this.$value = this.$el.querySelector('[data-type="value"]');
    }

    clickHandler(event) {
        const {type} = event.target.dataset;

        if (type === 'label') {
            this.toggle();
        } else if (type === 'item') {
            const id = +event.target.dataset.id;
            this.select(id);
        } else if (type === 'backdrop') {
            this.close();
        }
    }

    get current() {
        return this.options.data.find(item => item.id === this.selectedId)
    }

    select(id) {
        this.selectedId = id;
        this.$value.textContent = this.current.value;
        const $current = this.$el.querySelector(`[data-id="${id}"]`);
        this.$el.querySelectorAll(`[data-type="item"]`).forEach(item => {
            item.classList.remove('selected');
        });
        $current.classList.add('selected');
        this.close();
        this.options.onSelect ? this.options.onSelect(this.current) : null;
    }

    get isOpen() {
        return this.$el.classList.contains('open')
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        this.$el.classList.add('open');
        this.$arrow.classList.remove('fa-angle-down');
        this.$arrow.classList.add('fa-angle-up');
    }

    close() {
        this.$el.classList.remove('open');
        this.$arrow.classList.remove('fa-angle-up');
        this.$arrow.classList.add('fa-angle-down');
    }

    destroy() {
        this.$el.removeEventListener('click', this.clickHandler);
        this.$el.remove();
    }
}

export default Select;
