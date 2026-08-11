async function readPhoto() {

    const input = document.getElementById("imageInput");
    const status = document.getElementById("ocrStatus");
    const textBox = document.getElementById("notesText");

    if (!input.files.length) {
        alert("पहले Photo चुनें।");
        return;
    }

    const image = input.files[0];

    status.innerText = "⏳ Photo पढ़ी जा रही है...";

    try {

        const result = await Tesseract.recognize(
            image,
            "eng",
            {
                logger: info => {
                    if (info.status === "recognizing text") {
                        status.innerText =
                            "⏳ Text पढ़ा जा रहा है: " +
                            Math.round(info.progress * 100) +
                            "%";
                    }
                }
            }
        );

        textBox.value = result.data.text;

        status.innerText =
            "✅ Text तैयार है। अब आप खुद इसे सुधार सकते हैं।";

    } catch (error) {

        console.error(error);

        status.innerText =
            "❌ Photo पढ़ने में समस्या हुई।";

    }
}


function makePaper() {

    document.getElementById("showInstitute").innerText =
        document.getElementById("institute").value ||
        "YOUR COACHING / SCHOOL NAME";

    document.getElementById("showTitle").innerText =
        document.getElementById("paperTitle").value ||
        "TEST PAPER";

    document.getElementById("showSubject").innerText =
        "Subject: " +
        (document.getElementById("subject").value || "__________");

    document.getElementById("showClass").innerText =
        "Class: " +
        (document.getElementById("className").value || "___");

    document.getElementById("showMarks").innerText =
        "Marks: " +
        (document.getElementById("marks").value || "___");

    document.getElementById("showTime").innerText =
        "Time: " +
        (document.getElementById("time").value || "___");

    document.getElementById("showQuestions").innerText =
        document.getElementById("questions").value ||
        "Questions यहाँ दिखाई देंगे।";
}


function printPaper() {
    window.print();
}
