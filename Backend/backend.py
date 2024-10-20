#import typst
import tempfile
import mathgenerator

typst_content = """
= (hello world!!)
#lorem(20)
"""


with tempfile.NamedTemporaryFile(delete_on_close=False) as fp:

    fp.write(b' == hellow!!!!!! AAAAAAAAAAAa')

    fp.seek(0)
    fp.close
    problem, solution = mathgenerator.addition()
    print(problem)
    print(solution)
 #   typst.compile(fp.name, output="hello.pdf")
