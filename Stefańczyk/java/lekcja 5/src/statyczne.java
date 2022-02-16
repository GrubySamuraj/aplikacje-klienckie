public class statyczne {
    public static void main(String[] args) {
        System.out.println(Constants.IP);
        System.out.println(Constants.PORT);
        System.out.println(Helpers.isEven(20));
        System.out.println(Helpers.isEven(21));
    }
    class Constants{
        final static String IP = "127.0.0.1";
        final static String PORT = "3000";
    }
    class Helpers{
        static boolean isEven(int x) {
            return x % 2 == 0;
        }
    }
}
