import {images, useCreditCardValidator} from 'react-creditcard-validator';
import "./cardNumberStyle.css";

const CardNumberInput = ({onCardNumberChange}) => {
    const {
        getCardNumberProps,
        getCardImageProps,
    } = useCreditCardValidator();

    const handleCardNumberChange = (e) => {
        const cardNumber = e.target.value;
        onCardNumberChange(cardNumber);
    };

    return (
        <div className="input-group">
            <input
                {...getCardNumberProps({
                    onChange: (e) =>
                        handleCardNumberChange(e)
                })}
            />
            <svg {...getCardImageProps({images})} />
        </div>
    );
};

export default CardNumberInput;
