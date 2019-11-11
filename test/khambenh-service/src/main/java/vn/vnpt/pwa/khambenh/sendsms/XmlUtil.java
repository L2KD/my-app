package vn.vnpt.pwa.khambenh.sendsms;

public class XmlUtil {
    public static String getValue(String xml, String openTag, String closeTag) {
        try {
            int idx_open = xml.indexOf(openTag);
            int len = openTag.length();
            int start = idx_open + len;
            int idx_close = xml.indexOf(closeTag);
            return xml.substring(start, idx_close);
        } catch (Exception ex) {
            return "";
        }
    }
}
