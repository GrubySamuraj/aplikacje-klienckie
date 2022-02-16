public class default_interface {
    public static void main(String[] args) {
        MultiDevice cos = new MultiDevice();
        cos.answer();
        cos.print("123");
        cos.call("123");
    }
    interface Fax {
        default void call(String number) {
            System.out.println("Calling " + number);
        }
        default void print(String doc) {
            System.out.println("Printing " + doc);
        }

        void answer(); // funkcja bez implementacji
    }
    static class MultiDevice implements Fax{

        @Override
        public void answer() {
            System.out.println("answering");
        }
    }
}
