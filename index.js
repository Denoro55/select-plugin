import './index.scss'
import Select from './select/select';
import './select/select.scss'

const select = new Select('#select', {
    placeholder: 'Выберите фреймворк',
    // selectedId: 3,
    data: [
        { value: 'React', id: 0 },
        { value: 'Vue', id: 1 },
        { value: 'Angular', id: 2 },
        { value: 'Next', id: 3 }
    ],
    onSelect(item) {
        console.log(item)
    }
});

window.s = select;

console.log(select);
