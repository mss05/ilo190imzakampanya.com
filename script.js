// MODAL İŞLEMLERİ
const modal = document.getElementById("kvkkModal");
const checkbox = document.getElementById("kvkkCheckbox");

function openModal() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

// Modal dışına tıklanırsa kapatma
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// KVKK Kabul Edildiğinde
function acceptKVKK() {
    checkbox.disabled = false; // Kilidi aç
    checkbox.checked = true;   // İşaretle
    closeModal();              // Modalı kapat
}

// FORM GÖNDERİMİ (GOOGLE SHEETS BAĞLANTISI)
document.getElementById("campaignForm").addEventListener("submit", function(e) {
    e.preventDefault();

    if (!checkbox.checked) {
        alert("Lütfen KVKK Aydınlatma Metni'ni okuyup onaylayınız.");
        return;
    }

    const submitBtn = document.getElementById("submitBtn");
    submitBtn.innerText = "Gönderiliyor...";
    submitBtn.disabled = true;

    // BURAYI KENDİ GOOGLE FORM BİLGİLERİNLE DOLDURMAN GEREKİYOR
    const GOOGLE_FORM_URL = "https://docs.google.com/forms/u/0/d/e/SENIN_FORM_ID_BURAYA/formResponse";
    
    // Google Form'daki "entry.XXXX" ID'lerini buraya eşle
    const formData = new FormData();
    formData.append("entry.123456789", document.getElementById("name").value);    // AD ID'si
    formData.append("entry.987654321", document.getElementById("surname").value); // SOYAD ID'si
    formData.append("entry.112233445", document.getElementById("email").value);   // EMAIL ID'si

    fetch(GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors", // Google Forms'a dışarıdan post atmak için gereklidir
        body: formData
    }).then(() => {
        alert("İmzanız başarıyla kaydedildi! Desteğiniz için teşekkürler.");
        // Formu temizle
        document.getElementById("campaignForm").reset();
        checkbox.disabled = true;
        submitBtn.innerText = "İMZALIYORUM";
        submitBtn.disabled = false;
        
        // Opsiyonel: Teşekkür sayfasına yönlendirme
        // window.location.href = "tesekkurler.html";
        
    }).catch((error) => {
        console.error("Hata:", error);
        alert("Bir hata oluştu. Lütfen tekrar deneyin.");
        submitBtn.innerText = "TEKRAR DENE";
        submitBtn.disabled = false;
    });
});
