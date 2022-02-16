public class domyslna_implemenetacja_interfejs {
    public static void main(String[] args) {
        MyClass myClass = new MyClass();
        myClass.test();
    }
    interface MyInterface {
        default void test() {
            System.out.println("wywołano test() ");
        }
    }
    static class MyClass implements MyInterface {
    }
}
