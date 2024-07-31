function uploadDocument() {
  var label = $("#uploadModal").find("#label").val().trim();
  var file = $("#uploadModal").find("#file").get(0).files[0];
  var filename = file ? file.name : "";
  if (!label) {
    alert("Please enter a label for the document");
    return;
  }
  if (label.length < 3) {
    alert("Document label should be greater than 2 characters");
    return;
  }
  if (!file) {
    alert("Please select a file");
    return;
  }
  var reader = new FileReader();
  reader.onload = function (e) {
    var documents = JSON.parse(localStorage.getItem("documents")) || [];
    var data = e.target.result;
    documents.push({
      id: `doc_${Math.random().toString(36).substr(2, 9)}`,
      label: label,
      filename: filename,
      data: data,
    });
    localStorage.setItem("documents", JSON.stringify(documents));
    $("#uploadModal").modal("hide");
    window.location.reload();
  };
  reader.readAsDataURL(file);
}

function deleteDocument(id) {
  var documents = JSON.parse(localStorage.getItem("documents")) || [];
  var index = documents.findIndex(function (doc) {
    return doc.id === id;
  });
  if (index !== -1) {
    Swal.fire({
      title: 'Are you sure you want to delete this document?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        documents.splice(index, 1);
        localStorage.setItem("documents", JSON.stringify(documents));
        window.location.reload();
      }
    });
  }
}

function editDocument() {
  var id = $("#editModal").find("#edited_id").data("id");
  var label = $("#editModal").find("#edited_label").val().trim();
  var file = $("#editModal").find("#edited_file").get(0).files[0];
  var filename = file ? file.name : "";

  if (!label) {
    alert("Please enter a label for the document");
    return;
  }
  if (label.length < 3) {
    alert("Document label should be greater than 2 characters");
    return;
  }
  if (
    file &&
    !file.type.startsWith("image/") &&
    !file.type.startsWith("application/")
  ) {
    alert("Only images and documents are allowed");
    return;
  }

  var updateDocumentData = function (e) {
    var documents = JSON.parse(localStorage.getItem("documents")) || [];
    var index = documents.findIndex((doc) => doc.id === id);
    if (index !== -1) {
      documents[index].label = label;
      if (filename) {
        documents[index].filename = filename;
        documents[index].data = e.target.result;
      }
    }
    localStorage.setItem("documents", JSON.stringify(documents));
    $("#editModal").modal("hide");
    window.location.reload();
  };

  if (file) {
    var reader = new FileReader();
    reader.onload = updateDocumentData;
    reader.readAsDataURL(file);
  } else {
    updateDocumentData();
  }
}

$(document).ready(function () {
  $("#editModal").on("show.bs.modal", function (event) {
    let button = $(event.relatedTarget);
    let id = button.data("id");
    let documents = JSON.parse(localStorage.getItem("documents")) || [];
    let document = documents.find((doc) => doc.id === id);
    let modal = $(this);
    modal.find("#edited_label").val(document.label);
    modal.find("#edited_id").data("id", id);
    modal.find("#edited_filename").text(document.filename);
    let index = documents.findIndex((doc) => doc.id === id);
    if (index !== -1) {
      let modal = $(this);
      modal.find("#edited_label").val(documents[index].label);
    }
  });
});

