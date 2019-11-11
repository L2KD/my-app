package vn.vnpt.pwa.khambenh.sendsms;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.Random;

public class ResponseUtil {
    public ResponseUtil() {
    }
    public static String getResponse(String request,String url)  throws Exception {

        URL sendUrl = new URL(url);
        URLConnection urlCon = sendUrl.openConnection();
        urlCon.setDoOutput(true);
        urlCon.setDoInput(true);
        HttpURLConnection httpConnection = (HttpURLConnection) urlCon;
        httpConnection.setRequestMethod("POST");
        httpConnection.setRequestProperty("Content-Type", "text/xml;charset=utf-8");
        httpConnection.setRequestProperty("Content-Length",
            Integer.toString(request.length()));
        PrintStream ps = null;
        try {
            ps = new PrintStream(httpConnection.getOutputStream(),true,"utf-8");
            //System.out.println("----------------------Ps------://: "+ps.checkError());
        }
        catch (java.net.ConnectException e) {
            throw e;
        }
        try {
            ps.write(request.getBytes("utf-8"));
            ps.flush();
            String str = httpConnection.getResponseMessage();
            InputStream is = httpConnection.getInputStream();
            InputStreamReader isr = new InputStreamReader(is,"utf-8");
            BufferedReader br = new BufferedReader(isr);
            str = "";
            StringBuffer sb = new StringBuffer();
            while ( (str = br.readLine()) != null) {
                sb.append(str);
            }
            is.close();
            return new String(sb.toString().getBytes("utf-8"),"utf-8");
        }
        catch (Exception e) {
            throw e;
        }

    }

    public static String getResponse(String url) throws Exception {
        URL sendUrl = new URL(url);
        URLConnection urlCon = sendUrl.openConnection();
        urlCon.setDoOutput(true);
        urlCon.setDoInput(true);
        HttpURLConnection httpConnection = (HttpURLConnection) urlCon;
        httpConnection.setRequestMethod("GET");
        //httpConnection.setConnectTimeout(10000);
        //httpConnection.setRequestProperty("Content-Type", "text/xml;charset=utf-8");
        //httpConnection.setRequestProperty("Content-Length", "0");
        InputStream is = httpConnection.getInputStream();
        InputStreamReader isr = new InputStreamReader(is, "utf-8");
        BufferedReader br = new BufferedReader(isr);
        String str = "";
        StringBuffer sb = new StringBuffer();
        while ((str = br.readLine()) != null) {
            sb.append(str);
        }
        is.close();

        return new String(sb.toString().getBytes("utf-8"), "utf-8").trim();
    }

    public static String get_seq() {
        int n = new Random().nextInt(1000000000) + 1;
        return String.valueOf(n);
    }
}
