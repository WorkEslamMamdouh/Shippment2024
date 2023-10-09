using System;
using System.Globalization;
using System.Text;

public class ArabicNumberConverter
{
    public string NumberToArabicWords(long number)
    {
        if (number == 0)
        {
            return "صفر";
        }

        if (number < 0)
        {
            return "العدد خارج النطاق";
        }

        string[] arabicOnes = new string[]
        {
            "", "واحد", "اثنان", "ثلاثة", "أربعة",
            "خمسة", "ستة", "سبعة", "ثمانية", "تسعة"
        };

        string[] arabicTeens = new string[]
        {
            "عشرة", "أحدى عشر", "اثنا عشر", "ثلاثة عشر", "أربعة عشر",
            "خمسة عشر", "ستة عشر", "سبعة عشر", "ثمانية عشر", "تسعة عشر"
        };

        string[] arabicTens = new string[]
        {
            "", "عشرون", "ثلاثون", "أربعون", "خمسون",
            "ستون", "سبعون", "ثمانون", "تسعون"
        };

        string[] arabicTensm = new string[]
        {
            "", " مائة", "مائتان", " ثلاثمائة", " أربعمائة",
            "خمسمائة", "ستمائة", "سبعمائة", "ثمانمائة", " تسعمائة"
        };

        string[] arabicThousands = new string[]
        {
            "", " ألف", " مليون", " مليار", " تريليون"
        };

        StringBuilder result = new StringBuilder();

        int groupCount = 0;

        while (number > 0)
        {
            long group = number % 1000;
            number /= 1000;

            if (group > 0)
            {
                string groupWords = "";

                long hundreds = group / 100;
                long tens = group % 100;
                long ones = tens % 10;

                if (hundreds > 0)
                {
                    groupWords += arabicTensm[hundreds];

                    if (tens > 0)
                    {
                        groupWords += " و";
                    }
                }

                if (tens >= 10 && tens <= 19)
                {
                    groupWords += arabicTeens[tens - 10];
                }
                else
                {
                    if (ones > 0)
                    {
                        groupWords += arabicOnes[ones];
                    }

                    if (tens >= 20)
                    {
                        if (ones > 0)
                        {
                            groupWords += " و";
                        }

                        groupWords += arabicTens[(tens / 10) - 1];
                    }
                }

                if (groupCount > 0)
                {
                    groupWords += arabicThousands[groupCount];
                }

                if (result.Length > 0)
                {
                    result.Insert(0, " و");
                }

                result.Insert(0, groupWords);
            }

            groupCount++;
        }

        result = result.Replace("اثنان ألف", "الفان");
        result = result.Replace("اثنان مليون", "مليونان");
        result = result.Replace("عشرة ألف", "عشرة الاف");
        result = result.Replace("عشرة ألف", "عشرة الاف");
        result = result.Replace("عشرة مليون", "عشرة ملايين");

        return result.ToString().Trim();
    }
}
