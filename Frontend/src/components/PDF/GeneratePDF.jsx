import { generatePDF } from '../../utilities/generatePDF';
import Button from '../Button';

export default function GeneratePDF({invoice}) {

    return (
        <Button
            type="button"
            icon={<i class="fa-solid fa-download"></i>}
            text={'Download PDF '}
            fun={()=>{generatePDF(invoice)}}
            style={'btn_secondry'}
        />
    );
}
