import java.util.Set;
import java.util.HashSet;

public class sets {
    public static void main(String[] args) {
    Set<String> set1 = new HashSet<>();
    set1.add("a");
    set1.add("b");
    set1.add("c");
    set1.add("a");
    set1.add("a");
    System.out.println(set1);
    }
}
