using System; 


public class TafkeetArab
{
    public  string BSE_TafkeetArab(string Curname, string CurSmallName, decimal? TheNo)
    {
        long Number = (long)TheNo;
        string wholeno = "", Fracno = "";
        Curname = " " + Curname;
        CurSmallName = " " + CurSmallName;
        ArabicNumberConverter Tafkeet = new ArabicNumberConverter();
        wholeno = Tafkeet.NumberToArabicWords(Number);

        if ((TheNo - Number) > 0)
        { 
            Fracno = Tafkeet.NumberToArabicWords((long)((TheNo - Number) * 100));
        }

        if (!string.IsNullOrEmpty(wholeno))
        {
            wholeno += Curname;
        }

        if (!string.IsNullOrEmpty(wholeno) && !string.IsNullOrEmpty(Fracno))
        {
            wholeno += " و ";
        }

        wholeno += Fracno;

        if (!string.IsNullOrEmpty(Fracno))
        {
            wholeno += CurSmallName;
        }

        //return "فقط " + wholeno;
        return  wholeno;
    }

  
}
