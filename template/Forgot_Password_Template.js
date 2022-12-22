const Forgot_Password_Template = (name,link)=>{
    return `<div>
    <h1 style="color:slateblue">Hii, ${name} Welcome to Code-S</h1>
    <article style="margin:auto;object-fit:'cover'">
    <b>Password reset link:-</b>${link}
    </article>
    </div>`
}

module.exports = Forgot_Password_Template;