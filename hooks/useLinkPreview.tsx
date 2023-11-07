
export const useLinkPreview = async(url:string) => {
  
    try {
      const res = await fetch(
        `https://getlinkpreview.onrender.com/?url=${url}`
      );

      const data = await res.json();
    return {data, error:false}
      /* setData(data); */
    } catch (err :any) {
        return {data:null, error:true}
    }  
};

export default useLinkPreview




/* 
import axios from "axios";
 



const useLinkPreview = async (url: string) => {


    const response = await axios.get(url);

    const parser = new DOMParser();
    const doc = parser.parseFromString(response.data, "text/html");
    const title = doc.querySelector("title")?.textContent || "";
    const description =
        doc
            .querySelector('meta[name="description"]')
            ?.getAttribute("content") || "";
    const image =
        doc
            .querySelector('meta[property="og:image"]')
            ?.getAttribute("content") || "";

    return { title, description, image };
}

export default useLinkPreview */