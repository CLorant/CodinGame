using System;
using System.Linq;
using System.Collections.Generic;

class Solution
{
    static void Main(string[] args)
    {
        int n = int.Parse(Console.ReadLine());
        int q = int.Parse(Console.ReadLine());
        
        Dictionary<string, string> extMIMEDict = new Dictionary<string, string>();

        for (int i = 0; i < n; i++)
        {
            string[] inputs = Console.ReadLine().Split(' ');
            string ext = inputs[0].ToLowerInvariant();
            string mt = inputs[1];
            extMIMEDict[ext] = mt;
        }

        for (int i = 0; i < q; i++)
        {
            string fileName = Console.ReadLine();
            
            // if it doesn't contain a dot then it's incorrect, so UNKNOWN
            if (!fileName.Contains('.'))
            {
                Console.WriteLine("UNKNOWN");
                continue;
            }

            // split the filename at every dot, return the last element and convert that to lowercase
            string fileExtension = fileName.Split('.').Last().ToLowerInvariant();
            
            if (extMIMEDict.TryGetValue(fileExtension, out string mimeType))
            {
                Console.WriteLine(mimeType);
            }
            else
            {
                Console.WriteLine("UNKNOWN");
            }
        }
    }
}