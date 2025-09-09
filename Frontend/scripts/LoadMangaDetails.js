
        function loadMangaData() {

            const params = new URLSearchParams(window.location.search);

            let title = params.get("title")
            let image = params.get("image")
            let summary = params.get("summary")
            const genresArray = JSON.parse(params.get("genres")); 
            const genres = genresArray.map(g => g.name).join(", "); 
            let year = params.get("year")
            let author = params.get("author")
            let editor = params.get("editor")
            let volumes = params.get("volumes")
            let status = params.get("status")
            let score = params.get("score")
            console.log(genres, author)



            document.getElementById('mangaTitle').textContent = title;
            document.getElementById('mangaImage').src = image;
            document.getElementById('mangaImage').alt = title;
            document.getElementById('mangaSummaryBody').textContent = summary;
            document.getElementById('mangaGenresBody').textContent = genres;
            document.getElementById('mangaYearBody').textContent = year;
            document.getElementById('mangaAuthorBody').textContent = author;
            document.getElementById('mangaEditorBody').textContent = editor;
            document.getElementById('mangaVolumesBody').textContent = volumes;
            document.getElementById('mangaStatusBody').textContent = status;
            document.getElementById('mangaScoreBody').textContent = score + "/5";
        }
        backButton.addEventListener('click',(event)=>{
            backButton=document.getElementById("backButton")
           event.preventDefault()

            window.location.href='catalogo.html'
        })

        document.addEventListener('DOMContentLoaded', loadMangaData);