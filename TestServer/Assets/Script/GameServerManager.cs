using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Net;
using System.IO;
using Newtonsoft.Json;

public class GameServerManager : MonoBehaviour {

    [SerializeField]
    string URL;

    // Use this for initialization
    void Start()
    {
        try
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(URL);
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            Stream stream = response.GetResponseStream();
            string responseBody = new StreamReader(stream).ReadToEnd();

            print(responseBody);

            Player[] players = JsonConvert.DeserializeObject<Player[]>(responseBody);
            print(players[0].name);
        }
        catch (WebException ex)
        {

        }
    }

    // Update is called once per frame
    void Update()
    {

    }
}
