const Forgot_Password_Template = (name,link)=>{
    // return `<div>
    // <h1 style="color:slateblue">Hii, ${name} Welcome to Code-S</h1>
    // <article style="margin:auto;object-fit:'cover'">
    // <b>Password reset link:-</b>${link}
    // </article>
    // </div>`

    return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title></title><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"></head>
    <body>
    <section class="container my-5 d-flex justify-content-center">
    <div class="card w-75 h-75">
    <div class="card-header text-center"><h3>Reset your password </h3></div>
    <div class="card-body"><p class="fw-bold">hi,  ${name}</p><p>We've received a request to reset your password.</p><div class="d-flex justify-content-center my-4"><a href="${link}" class="btn btn-success btn-sm">Reset Password</a></div>
    <p>If you didn't make this request, just ignore this message.</p><br><p class="fw-bold"> Thanks,<br>The Code-S Team</p>
    <hr><p>If you are having trouble clicking the "Reset Password" button, copy and paste the URL below into your web browser:- ${link}</p></div>
    </div></section></body></html`
}

module.exports = Forgot_Password_Template;