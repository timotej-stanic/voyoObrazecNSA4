document.addEventListener('DOMContentLoaded', () => {
    const paymentOptions = document.querySelectorAll('.radio-button-custom');
    const paymentRadios = document.querySelectorAll('input[name="paymentType"]');
    const continueButton = document.getElementById('btnNadaljuj');

    
    const handlePaymentSelection = () => {
        let isSelected = false;

        paymentRadios.forEach(radio => {
            const parentBox = radio.closest('.radio-button-custom');

            if (radio.checked) {
                
                paymentOptions.forEach(box => box.classList.remove('izbran-nacin'));
                parentBox.classList.add('izbran-nacin');
                
                isSelected = true;
            }
        });
        
       
        continueButton.disabled = !isSelected;
    };

    handlePaymentSelection();

    
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', handlePaymentSelection);
    });


    
    continueButton.addEventListener('click', (e) => {
       
        e.preventDefault(); 
        
        const selectedPayment = document.querySelector('input[name="paymentType"]:checked').value;
        let paymentName;

        switch (selectedPayment) {
            case 'sms':
                paymentName = 'SMS (mobilni operater)';
                break;
            case 'cc':
                paymentName = 'Plačilna kartica / Google Pay / Apple Pay';
                break;
            case 'paypalOld':
                paymentName = 'PayPal';
                break;
            default:
                paymentName = 'neznan način';
        }

        // Prikaz opozorila z uporabo SweetAlert
        Swal.fire({
            title: 'Nadaljevanje na plačilo',
            html: `Nadaljujete s plačilom preko: <strong>${paymentName}</strong>. <br><br> (Korak 4: Povzetek in dokončanje registracije/naročila.)`,
            icon: 'info',
            confirmButtonText: 'Razumem'
        });


    });
});