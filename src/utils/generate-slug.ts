const translit = (str: string): string => {
  
  const ru = "А-а-Б-б-В-в-Г-г-Д-д-Е-е-Ё-ё-Ж-ж-З-з-И-и-Й-й-К-к-Л-л-М-м-Н-н-О-о" +
    "-Я-я-Ю-ю-Э-э-Ь-ь-Ы-ы-Ъ-ъ-Щ-щ-Ш-ш-Ч-ч-Ц-" +
    "ц-Х-х-Ф-ф-У-у-Т-т-С-с-Р-р-П-п".split('-')
  
  
  const en = "A-a-B-b-V-v-G-g-D-d-E-e-Z-z-I-i" +
    "-J-j-K-k-L-l-M-m-N-n-O" +
    "-o-P-p-R-r-S-s-T-t-U-u-F-f-H-h".split('-')
  
  let res = ''
  let n;
  for (let i = 0, l = str.length; i < l; i++) {
    const s = str.charAt(i);
    n = ru.indexOf(s);
    if (n >= 0) {
      res += en[n];
    } else {
      res += s;
    }
  }
  return res
};

export const generateSlug =(str: string): string => {
  let url: string = str.replace(/[\s]+/gi,'-')
  url = translit(url)
  url = url
    .replace(/[^0-9a-z_\-]+/gi,'')
    .replace('---','-')
    .replace('--','-')
    .toLocaleLowerCase()
  return url
  
}