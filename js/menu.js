let navbar = `<nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="index.html">Menu</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item"><a class="nav-link" href="user_list.html">User List</a></li>
                    <li class="nav-item"><a class="nav-link" href="documents.html">Documents</a></li>
                    <li class="nav-item"><a class="nav-link" href="chat.html">Chat</a></li>
                    <li class="nav-item">
                    <a class="nav-link"
                        href="javascript:localStorage.removeItem('loggedInUser');window.location.href='index.html';">Logout</a>
                    </li>
                </ul>
            </div>
        </nav>`;
let currentPage = window.location.href.split("/").pop().split(".")[0];
if (currentPage == "chat") {
    navbar = navbar.replace('<a class="nav-link" href="chat.html">Chat</a>', '<a class="nav-link active" href="chat.html">Chat</a>');
} else if (currentPage == "documents") {
    navbar = navbar.replace('<a class="nav-link" href="documents.html">Documents</a>', '<a class="nav-link active" href="documents.html">Documents</a>');
} else if (currentPage == "user_list") {
    navbar = navbar.replace('<a class="nav-link" href="user_list.html">User List</a>', '<a class="nav-link active" href="user_list.html">User List</a>');
} else {
    navbar = navbar.replace(`<a class="nav-link" href="${currentPage}.html">${currentPage}</a>`, `<a class="nav-link active" href="${currentPage}.html">${currentPage}</a>`);
}
document.write(navbar);