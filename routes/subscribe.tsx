import { define } from "../utils.ts";

export const handlers = define.handlers({
  async GET(ctx) {
    return { data: {} };
  },
  async POST(ctx) {
    const form = await ctx.req.formData();

    //const formEntries = form.entries();
    //const email = form.get("email")?.toString();
    console.log(form);
    
    const smtpEnvUrl =  Deno.env.get('EMAIL_SMTP_URL');
    const emailApiKey = Deno.env.get('EMAIL_API_KEY');
    console.log('EMAIL_SMTP_URL: ', smtpEnvUrl);
    console.log('EMAIL_API_KEY: ', emailApiKey);

    const response = await fetch(smtpEnvUrl, {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa(emailApiKey/*'9da96cfb98e5eb19c0b04851:'*/) },
            body: form
    });

    console.log(response.status);


    // Add email to list.

    // Redirect user to thank you page.
    const headers = new Headers();
    headers.set("location", "/thanks-for-subscribing");
    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  },
});

export default define.page<typeof handlers>(function Subscribe() {
  return (
    <>
      <form method="post">
        <input type="hidden" name="from" value="SEKURE@740bSecure.com" />
        <input type="hidden" name="to" value="669bluejay@gmail.com" />
        <input type="text" name="subject" value="SeKure Document" />
        <input type="text" name="text" value="testing text" />
        <button type="submit">Send SeKuRe DoKuMent 0.0.3</button>
      </form>
    </>
  );
});