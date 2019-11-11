package vn.vnpt.pwa.khambenh.sendsms;

public class SendSMS {
    static String SEND_URL = "http://113.185.0.35:8888/smsmarketing/api";

    // REQID Request ID
    // LABELID ID của nhãn
    // TEMPLATEID ID của mẫu tin nhắn
    // ISTELCOSUB Sử dụng nhóm thuê bao của nhà mạng. Giá trị 0 hoặc 1
    // PARAMS.NUM Số thứ tự của tham số truyền vào mẫu bản tin
    // PARAMS.CONTENT Nội dung của tham số tương ứng
    // CONTRACTTYPEID Tin nhắn QC = 2, tin nhắn CSKH = 1
    // SCHEDULETIME Đặt lịch gửi tin. Cấu trúc là : dd/MM/yyyy hh24:mi, ví dụ :
    // 08/05/2012 16:30
    // MOBILELIST Danh sách các số thuê bao cần gửi, các thuê bao phân cách bởi
    // dấu phẩy , và không có khoảng trắng
    // AGENTID ID của nhà đại lý (Vinaphone cấp)
    // APIUSER Username của API (Vinaphone cấp)
    // APIPASS Password của API (Vinaphone cấp)
    // USERNAME User đăng nhập của Agent
    // CONTRACTID ID của hợp đồng
    public static String sendByList(String REQID, String LABELID,
                                    String TEMPLATEID, String ISTELCOSUB, String CONTRACTTYPEID,
                                    String SCHEDULETIME, String MOBILELIST, String AGENTID,
                                    String APIUSER, String APIPASS, String USERNAME, String CONTRACTID,
                                    String[] PARAMS) {
        String req = buildSendByListReq(REQID, LABELID, TEMPLATEID, ISTELCOSUB,
            CONTRACTTYPEID, SCHEDULETIME, MOBILELIST, AGENTID, APIUSER,
            APIPASS, USERNAME, CONTRACTID, PARAMS);
        //System.out.println("-------------vd /////rep -----: " + req);
        String resp = "";
        try {
            resp = ResponseUtil.getResponse(req, SEND_URL);

            //System.out.println("-------------vd resp -----: " + resp);
        } catch (Exception exp) {
            return null;
        }
        return resp;
    }

    // REQID Request ID
    // LABELID ID của nhãn
    // TEMPLATEID ID của mẫu tin nhắn
    // MOBILEGOUPID ID của nhóm thuê bao (nhóm của đại lý hoặc nhóm của nhà
    // mạng)
    // ISTELCOSUB Sử dụng nhóm thuê bao của nhà mạng. Giá trị 0 hoặc 1
    // PARAMS.NUM Số thứ tự của tham số truyền vào mẫu bản tin
    // PARAMS.CONTENT Nội dung của tham số tương ứng
    // MAXITEM Số thuê bao được gửi (gửi cho toàn bộ thuê bao trong nhóm thì giá
    // trị là 0)
    // CONTRACTTYPEID Tin nhắn QC = 2, tin nhắn CSKH = 1
    // SCHEDULETIME Đặt lịch gửi tin. Cấu trúc là : dd/MM/yyyy hh24:mi, ví dụ :
    // 08/05/2012 16:30
    // AGENTID ID của nhà đại lý (Vinaphone cấp)
    // APIUSER Username của API (Vinaphone cấp)
    // APIPASS Password của API (Vinaphone cấp)
    // USERNAME user đăng nhập của agent
    public static String sendByGroup(String REQID, String LABELID,
                                     String TEMPLATEID, String MOBILEGOUPID, String ISTELCOSUB,
                                     String CONTRACTTYPEID, String SCHEDULETIME, String MAXITEM,
                                     String AGENTID, String APIUSER, String APIPASS, String USERNAME,
                                     String CONTRACTID, String[] PARAMS) {
        String req = buildSendByGroupReq(REQID, LABELID, TEMPLATEID,
            MOBILEGOUPID, ISTELCOSUB, CONTRACTTYPEID, SCHEDULETIME,
            MAXITEM, AGENTID, APIUSER, APIPASS, USERNAME, CONTRACTID,
            PARAMS);
        String resp = "";
        try {
            resp = ResponseUtil.getResponse(req, SEND_URL);
        } catch (Exception exp) {
            return null;
        }
        return XmlUtil.getValue(resp, "<ERROR>", "</ERROR>");
    }

    private static String buildSendByListReq(String REQID, String LABELID,
                                             String TEMPLATEID, String ISTELCOSUB, String CONTRACTTYPEID,
                                             String SCHEDULETIME, String MOBILELIST, String AGENTID,
                                             String APIUSER, String APIPASS, String USERNAME, String CONTRACTID,
                                             String[] PARAMS) {
        //	//System.out.println("-------VDR SMSsendbyList--------------------");
        StringBuilder sb = new StringBuilder();
        sb.append("<RQST name=\"send_sms_list\">");
        sb.append("<REQID>").append(REQID).append("</REQID>");
        sb.append("<LABELID>").append(LABELID).append("</LABELID>");
        sb.append("<TEMPLATEID>").append(TEMPLATEID).append("</TEMPLATEID>");
        sb.append("<ISTELCOSUB>").append(ISTELCOSUB).append("</ISTELCOSUB>");
        sb.append("<CONTRACTTYPEID>").append(CONTRACTTYPEID)
            .append("</CONTRACTTYPEID>");
        sb.append("<SCHEDULETIME>").append(SCHEDULETIME)
            .append("</SCHEDULETIME>");
        sb.append("<MOBILELIST>").append(MOBILELIST).append("</MOBILELIST>");
        sb.append("<AGENTID>").append(AGENTID).append("</AGENTID>");
        sb.append("<APIUSER>").append(APIUSER).append("</APIUSER>");
        sb.append("<APIPASS>").append(APIPASS).append("</APIPASS>");
        sb.append("<USERNAME>").append(USERNAME).append("</USERNAME>");
        sb.append("<CONTRACTID>").append(CONTRACTID).append("</CONTRACTID>");
        if (PARAMS != null && PARAMS.length > 0) {
            for (int j = 0; j < PARAMS.length; j++) {
                sb.append("<PARAMS>");
                sb.append("<NUM>").append(j + 1).append("</NUM><CONTENT>")
                    .append(PARAMS[j]).append("</CONTENT>");
                sb.append("</PARAMS>");
            }
        }
        sb.append("</RQST>");
        return sb.toString();
    }

    private static String buildSendByGroupReq(String REQID, String LABELID,
                                              String TEMPLATEID, String MOBILEGOUPID, String ISTELCOSUB,
                                              String CONTRACTTYPEID, String SCHEDULETIME, String MAXITEM,
                                              String AGENTID, String APIUSER, String APIPASS, String USERNAME,
                                              String CONTRACTID, String[] PARAMS) {
        StringBuilder sb = new StringBuilder();
        sb.append("<RQST name=\"send_sms_group\">");
        sb.append("<REQID>").append(REQID).append("</REQID>");
        sb.append("<LABELID>").append(LABELID).append("</LABELID>");
        sb.append("<TEMPLATEID>").append(TEMPLATEID).append("</TEMPLATEID>");
        sb.append("<MOBILEGOUPID>").append(MOBILEGOUPID)
            .append("</MOBILEGOUPID>");
        sb.append("<ISTELCOSUB>").append(ISTELCOSUB).append("</ISTELCOSUB>");
        sb.append("<MAXITEM>").append(MAXITEM).append("</MAXITEM>");
        sb.append("<CONTRACTTYPEID>").append(CONTRACTTYPEID)
            .append("</CONTRACTTYPEID>");
        sb.append("<SCHEDULETIME>").append(SCHEDULETIME)
            .append("</SCHEDULETIME>");
        sb.append("<AGENTID>").append(AGENTID).append("</AGENTID>");
        sb.append("<APIUSER>").append(APIUSER).append("</APIUSER>");
        sb.append("<APIPASS>").append(APIPASS).append("</APIPASS>");
        sb.append("<USERNAME>").append(USERNAME).append("</USERNAME>");
        sb.append("<CONTRACTID>").append(CONTRACTID).append("</CONTRACTID>");
        if (PARAMS != null && PARAMS.length > 0) {
            for (int j = 0; j < PARAMS.length; j++) {
                sb.append("<PARAMS>");
                sb.append("<NUM>").append(j + 1).append("</NUM><CONTENT>")
                    .append(PARAMS[j]).append("</CONTENT>");
                sb.append("</PARAMS>");
            }
        }
        sb.append("</RQST>");
        return sb.toString();
    }
}
