async function getDeck() {
    const location = new URL(document.location)
    const deckId = location.searchParams.get('deck');
    if (deckId) {
        const response = await fetch(`${deckId}.json`)
        const deckData = await response.json()
        const currentSlideIndex = deckData.slides.findIndex(s => s === location.pathname)

        // Add "previous" button
        if (currentSlideIndex > 0) {
            const prevButton = document.createElement("a")
            prevButton.href = deckData.slides[currentSlideIndex - 1] + location.search
            prevButton.innerHTML = "<-previous"
            document.body.appendChild(prevButton)
        } else {
            document.body.appendChild(document.createTextNode("<-previous"))
        }

        document.body.appendChild(document.createTextNode(" | "))

        // Add "next" Button
        if (currentSlideIndex > -1 && currentSlideIndex !== deckData.slides.length - 1) {
            const nextButton = document.createElement("a")
            nextButton.href = deckData.slides[currentSlideIndex + 1] + location.search
            nextButton.innerHTML = "next->"
            document.body.appendChild(nextButton)
        } else {
            document.body.appendChild(document.createTextNode("next->"))
        }

    }
}

getDeck();
