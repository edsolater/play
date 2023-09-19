const rawText = `     DO NOT EDIT! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<body>
    <DL><p>
        <DT><H3 ADD_DATE="1620273793" LAST_MODIFIED="1641465368">see later</H3>
        <DL><p>
            <DT><A HREF="https://www.uisdc.com/10-design-psychology-knowledge" ADD_DATE="1599704443" ICON="data:image/png;base64,iVBORw0KGgoAAAANSUhEg==">万字长文！十大设计心理学知识点全面解析 | 优设网 - UISDC</A>`

            
/**
 * 
 * @param {string} text 
 * @returns 
 */
function splitToArray(text) {
  return  Array.from(text.match(/(?:<A.*?>.*?<\/A>)|(?:<H3.*?>.*?<\/H3>)/g))
}

console.log('r: ', splitToArray(rawText))
