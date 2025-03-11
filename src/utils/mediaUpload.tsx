// // Ihp9cBhftND5gFZg
// //anon public-> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvcXptbWJkdmxqamp4dG5wcmttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2NjY4NzIsImV4cCI6MjA1NzI0Mjg3Mn0.XKGKG8mM65TGEyQZ8z_MteFJ8-l7SIJZ74bM9CRioPA
// // Project URL-> https://zoqzmmbdvljjjxtnprkm.supabase.co
//
// import { createClient } from "@supabase/supabase-js";
//
// const anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvcXptbWJkdmxqamp4dG5wcmttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2NjY4NzIsImV4cCI6MjA1NzI0Mjg3Mn0.XKGKG8mM65TGEyQZ8z_MteFJ8-l7SIJZ74bM9CRioPA"
// const supabase_url = "https://zoqzmmbdvljjjxtnprkm.supabase.co"
// const supabase = createClient(supabase_url, anon_key)
//
// export default function mediaUpload(file: File) {
//     return new Promise((resolve, reject) => {
//         if(file == null){
//             reject("No file selected")
//         }
//
//         const timestamp = new Date().getTime();
//         const fileName = timestamp + file.name;
//
//         supabase.storage
//             .from("images")
//             .upload(fileName, file, {
//                 cacheControl: "3600",
//                 upsert: false,
//             })
//             .then(() => {
//                 const publicUrl = supabase.storage.from("car-images").getPublicUrl(fileName)
//                     .data.publicUrl;
//                 resolve(publicUrl);
//             }).catch(()=>{
//             reject("Error uploading file")
//         })
//     });
// }


import { createClient } from "@supabase/supabase-js";

const supabase_url = "https://zoqzmmbdvljjjxtnprkm.supabase.co";
const anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvcXptbWJkdmxqamp4dG5wcmttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2NjY4NzIsImV4cCI6MjA1NzI0Mjg3Mn0.XKGKG8mM65TGEyQZ8z_MteFJ8-l7SIJZ74bM9CRioPA";

const supabase = createClient(supabase_url, anon_key);

// export default async function mediaUpload(file: File): Promise<string> {
//     if (!file) {
//         throw new Error("No file selected");
//     }
//
//     const timestamp = new Date().getTime();
//     const fileName = `${timestamp}-${file.name}`;
//
//     const { error } = await supabase.storage.from("images").upload(fileName, file, {
//         cacheControl: "3600",
//         upsert: false,
//     });
//
//     if (error) {
//         throw new Error("Error uploading file");
//     }
//
//     const { data } = supabase.storage.from("images").getPublicUrl(fileName);
//     return data.publicUrl;
// }
export default async function mediaUpload(file: File): Promise<string> {
    if (!file) {
        throw new Error("No file selected");
    }

    const timestamp = new Date().getTime();
    const fileName = `${timestamp}-${file.name}`;

    try {
        const { error } = await supabase.storage.from("car-images").upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
        });

        if (error) {
            throw new Error(error.message);  // Provide detailed error message
        }

        const { data } = supabase.storage.from("car-images").getPublicUrl(fileName);
        return data.publicUrl;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw new Error("An unknown error occurred while uploading the file.");
    }
}
