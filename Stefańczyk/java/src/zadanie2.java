import java.util.Arrays;

class arrays {
    public static void main(String[] args) {
        System.out.println(formatSth("a", "b", "c", "d"));
        System.out.println(Arrays.toString(formatSth2("d","e","f")));
    }
    static String formatSth(String... args) {
        return Arrays.toString(args);
    }
    static String[] formatSth2(String... args){
        return args;
    }
}