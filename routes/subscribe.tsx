import { define } from "../utils.ts";

export const handler = define.handlers({
  async GET(ctx) {
    return { data: { message: null } };
  },
  async POST(ctx) {
    const form = await ctx.req.formData();
    const file = form.get("attachments") as File;

    if (!file) {
      return { data: { message: "Please try again"} };
    }

    const name = file.name;
    const contents = await file.text();

    console.log(contents);
    
    const smtpEnvUrl =  Deno.env.get('EMAIL_SMTP_URL');
    const emailApiKey = Deno.env.get('EMAIL_API_KEY');
    
    const response = await fetch(smtpEnvUrl, {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa(emailApiKey + ':') },
            body: form
    });

    console.log(response.status);

    // Add email to list.

    // Redirect user to thank you page.

    return { data: { message: `${name} uploaded!` } };    
    /*const headers = new Headers();
    headers.set("location", "/thanks-for-subscribing");
    return new Response(null, {
      status: 303, // See Other
      headers,
    });*/
  },
});

export default define.page<typeof handler>(function Upload(props) {
  const { message } = props.data;
  return (
    <>
      <form method="post" encType="multipart/form-data">
        <input type="hidden" name="from" value="SEKURE@740bSecure.com" />
        <input type="hidden" name="to" value="669bluejay@gmail.com" />
        <input type="text" name="subject" value="SeKure Document multipart" />
        <input type="text" name="text" value="multipart 0.0.13 success" />
        <input type="file" name="attachments" />
        <button type="submit">Send SeKuRe DoKuMent 0.0.13</button>
      </form>
      {message ? <p>{message}</p> : null}
    </>
  );
});