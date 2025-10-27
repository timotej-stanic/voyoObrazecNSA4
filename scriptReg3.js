document.addEventListener('DOMContentLoaded', () => {
    const paymentOptions = document.querySelectorAll('.radio-button-custom');
    const paymentRadios = document.querySelectorAll('input[name="paymentType"]');
    const continueButton = document.getElementById('btnNadaljuj');

    // 1. Logika za stiliziranje izbranega načina plačila in omogočanje gumba
    const handlePaymentSelection = () => {
        let isSelected = false;

        paymentRadios.forEach(radio => {
            const parentBox = radio.closest('.radio-button-custom');

            if (radio.checked) {
                // Dodaj stil izbranemu elementu in odstrani ga ostalim
                paymentOptions.forEach(box => box.classList.remove('izbran-nacin'));
                parentBox.classList.add('izbran-nacin');
                
                isSelected = true;
            }
        });
        
        // Omogoči gumb, če je karkoli izbrano
        continueButton.disabled = !isSelected;
    };

    // Inicializacija ob nalaganju strani (ker je SMS že 'checked' v HTML)
    handlePaymentSelection();

    // Dodajanje event listenerjev vsem radio gumbom
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', handlePaymentSelection);
    });


    // 3. Logika za gumb "NAPREJ NA PLAČILO"
    continueButton.addEventListener('click', (e) => {
        // Prepreči standardno oddajo obrazca (če bi bil gumb v <form>)
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

        // Prikaz opozorila z uporabo SweetAlert2 (kot je omenjeno v HTML)
        Swal.fire({
            title: 'Nadaljevanje na plačilo',
            html: `Nadaljujete s plačilom preko: <strong>${paymentName}</strong>. <br><br> (Korak 4: Povzetek in dokončanje registracije/naročila.)`,
            icon: 'info',
            confirmButtonText: 'Razumem'
        });

        // TUKAJ BI OBIČAJNO SLEDI PREUSMERITEV:
        // window.location.href = `/payment/process?type=${selectedPayment}`;
    });
});