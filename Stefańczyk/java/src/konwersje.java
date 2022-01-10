public class konwersje {
    public static void main(String[] args) {
        int a = Integer.parseInt("123");
        float c = Float.parseFloat("123");
        double d = Double.parseDouble("123");
        boolean e = Boolean.parseBoolean("false");
        boolean f = Boolean.parseBoolean("aaa");
        String g = String.valueOf(true);
        String h = String.valueOf(456);
        String i = String.valueOf(12.34);
        String j  = String.valueOf(2 > 1);
        System.out.println(j);
    }
}
