document.addEventListener("DOMContentLoaded", function () {
    const checkboxPravna = document.getElementById("jePravna");
    const pravnaDiv = document.getElementById("pravnaOseba");
    const btnNadaljuj = document.getElementById("btnNadaljuj");
    
   
    pravnaDiv.classList.remove("show");
    checkboxPravna.addEventListener("change", function () {
        this.checked ? pravnaDiv.classList.add("show") : pravnaDiv.classList.remove("show");
      
        preveriStanjeGumba(); 
    });
    
 
    const vsiElementi = document.querySelectorAll(
        '#email, #geslo, #potrdiGeslo, #telefon, #uporabaTel, #uporabaPod, #pogoji, #imePodjetja, #davcnaSt'
    );

    function preveriStanjeGumba() {
        let vsiIzpolnjeni = true;

        vsiElementi.forEach(input => {
          
            if (!pravnaDiv.classList.contains("show") && (input.id === 'imePodjetja' || input.id === 'davcnaSt')) {
                return; 
            }

            
            if (input.type !== 'checkbox' && input.required && !input.value.trim()) {
                vsiIzpolnjeni = false;
            } 
            
            else if (input.type === 'checkbox' && input.required && !input.checked) {
                vsiIzpolnjeni = false;
            }
        });

       
        btnNadaljuj.disabled = !vsiIzpolnjeni;
        vsiIzpolnjeni ? btnNadaljuj.classList.add("active") : btnNadaljuj.classList.remove("active");
    }

    
    vsiElementi.forEach(input => {
        input.addEventListener('input', preveriStanjeGumba);
        input.addEventListener('change', preveriStanjeGumba);
    });
    preveriStanjeGumba(); 


   
    btnNadaljuj.addEventListener("click", function(e) {
        e.preventDefault(); 

        if (this.disabled) return;

        const email = document.getElementById("email").value.trim();
        const geslo = document.getElementById("geslo").value;
        const potrdiGeslo = document.getElementById("potrdiGeslo").value;

        
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(email)) {
            Swal.fire({ icon: 'error', title: 'Neveljaven E-naslov',confirmButtonColor: '#0A66C2', text: 'Prosimo, vnesite veljaven e-naslov.', confirmButtonText: 'V redu' });
            
            return;
        }

        
        const passRe = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=]).{5,32}$/;
        if (!passRe.test(geslo)) {
            Swal.fire({ icon: 'error', title: 'Neveljavno geslo',confirmButtonColor: '#0A66C2', text: 'Geslo mora imeti od 5 do 32 znakov in vsebovati vsaj eno veliko črko, eno številko in en poseben znak.', confirmButtonText: 'V redu' });
            
            return;
        }
        
      
        if (geslo !== potrdiGeslo) {
            Swal.fire({ icon: 'error', title: 'Potrditev gesla',confirmButtonColor: '#0A66C2', text: 'Gesli se ne ujemata. Prosimo, preverite vnos.', confirmButtonText: 'V redu' });
            
            return;
        }
        
        //uspesno
        Swal.fire({
            icon: 'success',
            title: 'Uspešna registracija',
            text: 'Nadaljujemo na naslednji korak.',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            window.location.href = "registracija2.html";
        });
    });
});